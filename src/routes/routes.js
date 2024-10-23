const express = require("express");
const { createUser, loginUser,getAllUsers } = require("../controller/userController");
const { generateOTP,sendOTPEmail } = require("../controller/verifyotp");
const { createProduct, getProductById,getProducts } = require("../controller/productController");

const router = express.Router();

// Route to create a new user
router.get("/user",getAllUsers);
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/createproduct",createProduct)
router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.post('/verify-otp', sendOTPEmail);
// router.post("/resend-otp", resendOtp);


module.exports = router; 