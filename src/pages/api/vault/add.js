import { connectToDatabase } from 'lib/mongodb';
import { requireAuth } from 'lib/auth';

export default async function handler(req, res) {
  console.log("🔵 ADD endpoint hit");
  console.log("Method:", req.method);
  console.log("Body:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Use the same auth helper as list.js
    const { userId } = await requireAuth(req, res);
    console.log("✅ Token verified, userId:", userId);

    const { serviceName, username, password } = req.body;

    if (!serviceName || !username || !password) {
      console.log("❌ Missing fields");
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const { db } = await connectToDatabase();
    console.log("✅ Connected to database");

    const result = await db.collection("vault").insertOne({
      userId,
      serviceName,
      username,
      password,
      createdAt: new Date(),
    });

    console.log("✅ Inserted document:", result.insertedId);

    return res.status(201).json({
      success: true,
      message: "Password added successfully",
      data: { id: result.insertedId, serviceName, username, password },
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    // requireAuth already sent the response, so just return
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return;
    }
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}