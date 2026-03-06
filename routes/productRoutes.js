const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin only
router.post("/", protect, createProduct);
module.exports = router;