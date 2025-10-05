// POST /api/register
// Registers a new user by hashing the password and storing user data in MongoDB
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../src/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  try {
    const emailLower = String(email).trim().toLowerCase();
    const { db } = await connectToDatabase();
    const users = db.collection("users");

    // Ensure unique email
    await users.createIndex({ email: 1 }, { unique: true });

    const existing = await users.findOne({ email: emailLower });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await users.insertOne({
      name: String(name).trim(),
      email: emailLower,
      passwordHash,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Registration successful",
      userId: String(result.insertedId),
    });
  } catch (err) {
    console.error("/api/register error", err);
    // Duplicate key protection
    if (err?.code === 11000) {
      return res.status(409).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
