// controllers/cartController.js
const Cart = require('../models/cartModel.js');
const Product = require('../models/productModel.js');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming user ID is available through authentication

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create a new cart if not exists
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const productIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (productIndex > -1) {
        // If product exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product does not exist, add it to the cart
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
