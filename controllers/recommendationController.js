// In controllers/recommendationController.js
const Product = require('../models/productModel'); // Make sure to use your correct Product model name

// @desc    Get alternative products with lower carbon footprint
// @route   GET /api/recommendations/alternatives/:productId
// @access  Public
const getAlternativeProducts = async (req, res) => {
  try {
    const { productId } = req.params;

    // 1. Find the original product
    const currentProduct = await Product.findById(productId);

    if (!currentProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Find alternative products in the same category with a LOWER carbon footprint
    const alternatives = await Product.find({
      _id: { $ne: productId }, // Not the current product
      category: currentProduct.category,
      carbonFootprint: { $lt: currentProduct.carbonFootprint }, // Lower footprint
    }).sort({ carbonFootprint: 1 }); // Sort by lowest footprint first

    res.json(alternatives);
  } catch (error) {
    console.error("RECOMMENDATION ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getAlternativeProducts };

// In controllers/recommendationController.js

// ... (keep the existing getAlternativeProducts function)

// @desc    Get top products (lowest emission) in a category
// @route   GET /api/recommendations/top/:category
// @access  Public
const getTopProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    // Find all products in the given category and sort them by carbon footprint (lowest first)
    const topProducts = await Product.find({ category }).sort({ carbonFootprint: 1 });

    if (topProducts.length === 0) {
      return res.status(404).json({ message: 'No products found in this category.' });
    }

    res.json(topProducts);
  } catch (error) {
    console.error("TOP PRODUCTS ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Don't forget to add the new function to the exports!
module.exports = {
  getAlternativeProducts,
  getTopProductsByCategory, // <-- ADD THIS LINE
};