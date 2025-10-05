// /api/passwords - CRUD for password entries, protected by JWT
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../src/lib/mongodb";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Add it to .env.local");
}

function getAuthUser(req) {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice("Bearer ".length);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const userPayload = getAuthUser(req);
  if (!userPayload) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { db } = await connectToDatabase();
  const passwords = db.collection("passwords");
  const userId = new ObjectId(userPayload.userId);

  try {
    if (req.method === "GET") {
      // List all password entries for the authenticated user
      const docs = await passwords
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
      return res.status(200).json(
        docs.map((d) => ({
          id: String(d._id),
          serviceName: d.serviceName,
          username: d.username,
          password: d.password,
          createdAt: d.createdAt,
          updatedAt: d.updatedAt,
        }))
      );
    }

    if (req.method === "POST") {
      // Create a new password entry
      const { serviceName, username, password } = req.body || {};
      if (!serviceName || !username || !password) {
        return res.status(400).json({ error: "serviceName, username and password are required" });
      }
      const doc = {
        userId,
        serviceName: String(serviceName).trim(),
        username: String(username).trim(),
        password: String(password),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await passwords.insertOne(doc);
      return res.status(201).json({ id: String(result.insertedId) });
    }

    if (req.method === "PUT") {
      // Update an existing password entry
      const { id, serviceName, username, password } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      const _id = new ObjectId(id);
      const updates = { updatedAt: new Date() };
      if (serviceName != null) updates.serviceName = String(serviceName).trim();
      if (username != null) updates.username = String(username).trim();
      if (password != null) updates.password = String(password);
      const result = await passwords.updateOne({ _id, userId }, { $set: updates });
      if (!result.matchedCount) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "DELETE") {
      // Delete an entry by id
      const id = req.query.id || (req.body && req.body.id);
      if (!id) return res.status(400).json({ error: "id is required" });
      const _id = new ObjectId(String(id));
      const result = await passwords.deleteOne({ _id, userId });
      if (!result.deletedCount) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("/api/passwords error", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
