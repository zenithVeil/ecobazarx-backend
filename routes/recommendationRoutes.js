const express = require('express');
const router = express.Router();

const { getAlternativeProducts, getTopProductsByCategory } = require('../controllers/recommendationController');

// Route for getting alternative products
router.get('/alternatives/:productId', getAlternativeProducts);

// Route for top products by category
router.get('/top/:category', getTopProductsByCategory);

module.exports = router;