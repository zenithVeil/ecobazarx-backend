// In controllers/activityController.js
const Activity = require('../models/activityModel');
const Product = require('../models/productModel'); // We need this to get the product's carbon footprint

// @desc    Log a new user activity (e.g., viewing a product)
// @route   POST /api/activity
// @access  Private
const logActivity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    // Find the product to get its current carbon footprint
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create the activity record
    const activity = await Activity.create({
      user: req.user._id, // Comes from the 'protect' middleware
      product: productId,
      action: action, // e.g., 'view'
      carbonFootprintAtTime: product.carbonFootprint,
    });

    res.status(201).json({ message: 'Activity logged successfully' });
  } catch (error) {
    console.error("ACTIVITY LOGGING ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { logActivity };