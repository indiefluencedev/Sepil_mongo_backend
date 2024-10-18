const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const { name, price, description }= data
    console.log(req.body)


    // Create a new product object
    const newProduct = await productModel.create(data)
    res.status(201).json({
      message: 'Product created successfully!',
      product: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to create product' });
  }
};


// Function to get product by ID
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        console.log(productId)

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

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find(); 
    res.status(200).send({ success: true, data: products });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};


module.exports = { createProduct, getProductById, getProducts };
