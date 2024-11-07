const Cart = require('../models/cartModel');

const addToCart = async (req, res) => {
    const { userId, products } = req.body; 
  
    if (!userId || !products || products.length === 0) {
      return res.status(400).json({ success: false, message: 'userId and products are required.' });
    }
  
    try {
      let cart = await Cart.findOne({ user: userId });
  
      if (cart) {
        products.forEach((product) => {
          const productIndex = cart.products.findIndex(p => p.productId.toString() === product.productId);
  
          if (productIndex > -1) {
            cart.products[productIndex].quantity += product.quantity;
          } else {
            cart.products.push({ productId: product.productId, quantity: product.quantity });
          }
        });
      } else {
        cart = new Cart({
          user: userId,
          products: products.map(product => ({
            productId: product.productId,
            quantity: product.quantity
          }))
        });
      }
  
      await cart.save();
      res.status(200).json({ success: true, message: 'Product(s) added to cart', cart });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding to cart', error: error.message });
    }
  };
  
  module.exports = { addToCart };
  