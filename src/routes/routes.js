const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const { createProduct, getProductById } = require("../controller/productController");

const router = express.Router();

// Route to create a new user
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/createproduct",createProduct)
router.get("/product/:id", getProductById);


module.exports = router;