const express = require("express");
const { createUser, loginUser,getAllUsers } = require("../controller/userController");
const {verifyOTP,resendOTP } = require("../controller/verifyotp");
const { createProduct, getProductById,getProducts } = require("../controller/productController");
// const cartController = require('../controllers/cartController');
// const authMiddleware = require('../middlewares/authMiddleware');

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
// router.post('/add-to-cart', authMiddleware, cartController.addToCart);

module.exports = router; 