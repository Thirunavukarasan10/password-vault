import { connectToDatabase } from 'lib/mongodb';
import VaultItem from 'lib/models/VaultItem';
import { requireAuth } from 'lib/auth';
import mongoose from 'mongoose';

async function deleteHandler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed', data: null });
  }

  const { id } = req.query || {};
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'Valid id is required', data: null });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid id format', data: null });
  }

  try {
    await connectToDatabase();
    const userId = req.user.id;

    const deleted = await VaultItem.findOneAndDelete({ _id: id, userId });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found', data: null });
    }

    return res.status(200).json({ success: true, message: 'Item deleted', data: { id } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete item', data: null });
  }
}

export default requireAuth(deleteHandler);
