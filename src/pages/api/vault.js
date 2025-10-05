import { connectToDatabase } from 'lib/mongodb';
import VaultItem from 'lib/models/VaultItem';
import { requireAuth } from 'lib/auth';

async function vaultHandler(req, res) {
  await connectToDatabase();
  const userId = req.user.id;

  if (req.method === 'GET') {
    try {
      const items = await VaultItem.find({ userId }).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: items });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to fetch items', error: err?.message });
    }
  }

  if (req.method === 'POST') {
    const { name, username, password } = req.body || {};
    if (!name || !username || !password) {
      return res.status(400).json({ success: false, message: 'name, username, and password are required' });
    }
    try {
      const created = await VaultItem.create({ userId, name, username, password });
      return res.status(201).json({ success: true, message: 'Item created', data: created });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to create item', error: err?.message });
    }
  }

  if (req.method === 'PUT') {
    const { id, name, username, password } = req.body || {};
    if (!id) {
      return res.status(400).json({ success: false, message: 'id is required' });
    }
    try {
      const updates = {};
      if (typeof name !== 'undefined') updates.name = name;
      if (typeof username !== 'undefined') updates.username = username;
      if (typeof password !== 'undefined') updates.password = password;

      const updated = await VaultItem.findOneAndUpdate(
        { _id: id, userId },
        { $set: updates },
        { new: true, runValidators: true }
      );
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json({ success: true, message: 'Item updated', data: updated });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to update item', error: err?.message });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query || req.body || {};
    const targetId = id || (req.body && req.body.id);
    if (!targetId) {
      return res.status(400).json({ success: false, message: 'id is required' });
    }
    try {
      const deleted = await VaultItem.findOneAndDelete({ _id: targetId, userId });
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Item not found' });
      }
      return res.status(200).json({ success: true, message: 'Item deleted' });
    } catch (err) {
      return res.status(500).json({ success: false, message: 'Failed to delete item', error: err?.message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  return res.status(405).json({ success: false, message: 'Method Not Allowed' });
}

export default requireAuth(vaultHandler);
