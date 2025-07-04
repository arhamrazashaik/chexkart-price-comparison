const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const { authenticateToken } = require('../middleware/auth');

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist.productId',
        select: 'name images prices rating brand category availability',
        match: { status: 'active' }
      });

    // Filter out any null products (deleted products)
    const wishlist = user.wishlist.filter(item => item.productId);

    // Transform the wishlist items to include product data
    const transformedWishlist = wishlist.map(item => ({
      _id: item._id,
      productId: item.productId._id,
      product: item.productId,
      addedAt: item.addedAt,
      priceAlert: item.priceAlert
    }));

    res.json(transformedWishlist);
  } catch (error) {
    console.error('Wishlist fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add product to wishlist
router.post('/add/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { priceAlert } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if already in wishlist
    const user = await User.findById(req.user._id);
    const existingItem = user.wishlist.find(item => 
      item.productId.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    // Add to wishlist
    await user.addToWishlist(productId, priceAlert);

    // Update product wishlist count
    await Product.findByIdAndUpdate(productId, {
      $inc: { 'analytics.wishlistCount': 1 }
    });

    res.json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove product from wishlist
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    const existingItem = user.wishlist.find(item => 
      item.productId.toString() === productId
    );

    if (!existingItem) {
      return res.status(404).json({ message: 'Product not in wishlist' });
    }

    // Remove from wishlist
    await user.removeFromWishlist(productId);

    // Update product wishlist count
    await Product.findByIdAndUpdate(productId, {
      $inc: { 'analytics.wishlistCount': -1 }
    });

    res.json({ message: 'Product removed from wishlist' });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update price alert for wishlist item
router.put('/price-alert/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { enabled, targetPrice } = req.body;

    const user = await User.findById(req.user._id);
    const wishlistItem = user.wishlist.find(item => 
      item.productId.toString() === productId
    );

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Product not in wishlist' });
    }

    // Update price alert
    wishlistItem.priceAlert.enabled = enabled;
    if (targetPrice !== undefined) {
      wishlistItem.priceAlert.targetPrice = targetPrice;
    }
    wishlistItem.priceAlert.notified = false;

    await user.save();

    res.json({ message: 'Price alert updated' });
  } catch (error) {
    console.error('Price alert update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check if product is in user's wishlist
router.get('/check/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);
    const inWishlist = user.wishlist.some(item =>
      item.productId.toString() === productId
    );

    res.json({ inWishlist });
  } catch (error) {
    console.error('Wishlist check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear entire wishlist
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Update product wishlist counts
    const productIds = user.wishlist.map(item => item.productId);
    await Product.updateMany(
      { _id: { $in: productIds } },
      { $inc: { 'analytics.wishlistCount': -1 } }
    );

    // Clear wishlist
    user.wishlist = [];
    await user.save();

    res.json({ message: 'Wishlist cleared' });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
