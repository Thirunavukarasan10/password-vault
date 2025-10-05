import { connectToDatabase } from 'lib/mongodb';
import VaultItem from 'lib/models/VaultItem';
import { requireAuth } from 'lib/auth';

async function addHandler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed', data: null });
  }

  const { name, username, password } = req.body || {};
  if (!name || !username || !password) {
    return res.status(400).json({ success: false, message: 'name, username, and password are required', data: null });
  }

  try {
    await connectToDatabase();
    const userId = req.user.id;

    const created = await VaultItem.create({ userId, name, username, password });
    return res.status(201).json({ success: true, message: 'Item created', data: created });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create item', data: null });
  }
}

export default requireAuth(addHandler);
