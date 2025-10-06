import { connectToDatabase } from 'lib/mongodb';
import { requireAuth } from 'lib/auth';

export default async function handler(req, res) {
  console.log("🔵 LIST endpoint hit");
  console.log("Method:", req.method);

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Use requireAuth helper
    const { userId } = await requireAuth(req, res);
    console.log("✅ Token verified, userId:", userId);

    const { db } = await connectToDatabase();
    console.log("✅ Connected to database");

    const passwords = await db.collection("vault")
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray();

    console.log("✅ Found passwords:", passwords.length);

    return res.status(200).json({
      success: true,
      data: passwords,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    // requireAuth already sent the response
    if (error.message === 'No token provided' || error.message === 'Invalid token') {
      return;
    }
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}