import { connectToDatabase } from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signJwt({ userId: user._id.toString() });

    // Return both token AND user data
    return res.status(200).json({ 
      success: true, 
      message: 'Logged in successfully', 
      data: { 
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email
        }
      } 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: err?.message });
  }
}