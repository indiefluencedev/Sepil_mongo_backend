const express = require("express");
const { createUser, loginUser,getAllUsers,updateUserProfile} = require("../controller/userController");
const {verifyOTP,resendOTP } = require("../controller/verifyotp");
const { createProduct, getProductById,getProducts,deleteProduct,updateProduct} = require("../controller/productController");
const cartController = require('../controller/cartController');


const router = express.Router();

// Route to create a new user
router.get("/user",getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/createproduct",createProduct)
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post('/verifyotp', verifyOTP);
router.post("/resendotp", resendOTP);
router.post('/add-to-cart', cartController.addToCart);
router.delete('/delete/:id', deleteProduct);
router.put('/update-profile', updateUserProfile);

module.exports = router; 