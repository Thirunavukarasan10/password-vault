import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

console.log("🔵 JWT_SECRET loaded:", JWT_SECRET.substring(0, 10) + "...");

export function signJwt(payload) {
  console.log("🔵 Signing JWT with payload:", payload);
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
  console.log("✅ Token created (first 20 chars):", token.substring(0, 20) + "...");
  return token;
}

export function verifyJwt(token) {
  try {
    console.log("🔵 Verifying token (first 20 chars):", token.substring(0, 20) + "...");
    console.log("🔵 Using JWT_SECRET (first 10 chars):", JWT_SECRET.substring(0, 10) + "...");
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verified, decoded:", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    throw new Error('Invalid token');
  }
}

export async function requireAuth(req, res) {
  const authHeader = req.headers.authorization;
  
  console.log("🔵 requireAuth - Authorization header:", authHeader ? "present" : "missing");
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("❌ No Bearer token in header");
    res.status(401).json({ success: false, message: 'No token provided' });
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];
  console.log("🔵 Extracted token (first 20 chars):", token.substring(0, 20) + "...");
  
  try {
    const decoded = verifyJwt(token);
    console.log("✅ requireAuth successful, userId:", decoded.userId);
    return { userId: decoded.userId };
  } catch (err) {
    console.error("❌ requireAuth failed:", err.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
    throw new Error('Invalid token');
  }
}