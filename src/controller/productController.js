const productModel = require("../models/productModel");
const { isValid } = require("../validator/validator");

// Function to create a new product
const Product = require('../models/productModel');

const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    console.log('Received body:', req.body);
    console.log('Received file:', req.file);

    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' });
    }

    const newProduct = {
      name,
      price,
      description,
      image: req.file.filename,
    };

    const product = await Product.create(newProduct);
    res.status(201).json({
      message: 'Product created successfully!',
      product,
    });
  } catch (error) {
    console.error('Error in createProduct:', error);
    res.status(500).json({ error: error.message || 'Failed to create product' });
  }
};

  

// Function to get product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.productId;

        // Find the product by ID
        const product = await productModel.findById(productId);
        console.log(product);

        // Check if the product exists
        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found" });
        }

        // Respond with the product data
        return res.status(200).send({ status: true, message: 'Product fetched successfully', data: product });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

module.exports = { createProduct, getProductById };
