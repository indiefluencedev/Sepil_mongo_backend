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


const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting product', error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  try {
    const product = await productModel.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true, runValidators: true }  
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating product', error: error.message });
  }
};

module.exports = { createProduct, getProductById, getProducts,deleteProduct,updateProduct };
