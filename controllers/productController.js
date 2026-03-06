const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const search = req.query.search;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.log("PRODUCT FETCH ERROR:", error); 
    res.status(500).json({ message: "Server Error" });
  }
};

// GET single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      carbonScore,
      description,
      image,
      ecoLabel,
    } = req.body;

    const product = new Product({
      name,
      price,
      category,
      carbonScore,
      description,
      image,
      ecoLabel,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};