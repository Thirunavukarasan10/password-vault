import { connectToDatabase } from 'lib/mongodb';
import VaultItem from 'lib/models/VaultItem';
import { requireAuth } from 'lib/auth';

async function listHandler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed', data: null });
  }

  try {
    await connectToDatabase();
    const userId = req.user.id;

    const items = await VaultItem.find({ userId }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: 'Items fetched', data: items });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch items', data: null });
  }
}

export default requireAuth(listHandler);
