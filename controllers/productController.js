const { calculateCarbonFootprint } = require('../utils/carbonCalculator');

// @desc    Predict carbon footprint for a product
// @route   POST /api/predict/carbon
// @access  Public
const predictCarbon = async (req, res) => {
  try {
    const { category, weight, materials } = req.body;

    if (!category || !weight) {
      return res.status(400).json({ message: 'Category and weight are required' });
    }

    const carbonData = calculateCarbonFootprint({ category, weight, materials });

    res.json({
      predictedCarbon: carbonData.emission,
      sustainabilityLevel: carbonData.level,
    });
  } catch (error) {
    console.error("PREDICTION ERROR:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { predictCarbon };