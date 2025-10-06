import { connectToDatabase } from '@/lib/mongodb';
import VaultItem from '@/lib/models/VaultItem';
import { requireAuth } from '@/lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      message: 'ID is required' 
    });
  }

  try {
    // Verify JWT and get userId
    const { userId } = await requireAuth(req, res);
    
    await connectToDatabase();

    // Find and delete the item (only if it belongs to this user)
    const deletedItem = await VaultItem.findOneAndDelete({ 
      _id: id, 
      userId 
    });

    if (!deletedItem) {
      return res.status(404).json({ 
        success: false, 
        message: 'Item not found or unauthorized' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Item deleted' 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to delete item', 
      error: err.message 
    });
  }
}