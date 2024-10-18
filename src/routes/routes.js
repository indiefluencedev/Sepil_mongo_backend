const express = require("express");
const { createUser, loginUser } = require("../controller/userController");
const { createProduct, getProductById,getProducts } = require("../controller/productController");

const router = express.Router();

// Route to create a new user
router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/createproduct",createProduct)
router.get("/products", getProducts);
router.get("/product/:id", getProductById);


module.exports = router;