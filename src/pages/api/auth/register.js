import { connectToDatabase } from 'lib/mongodb';
import User from 'lib/models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed', data: null });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required', data: null });
  }

  try {
    await connectToDatabase();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, message: 'User already exists', data: null });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, passwordHash });

    return res.status(201).json({ success: true, message: 'User registered successfully', data: { id: user._id, email: user.email } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Internal Server Error', data: null });
  }
}
