const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../middleware/uploads');
const multer = require('multer');

// Importing controllers
const { loginAdmin, registerAdmin } = require('../controller/AdminController');
const { createProduct, getProductById } = require('../controller/productController');



// Routes for authentication and user registration
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);



// Route for fetching a product by its ID
router.get('/products/:productId', getProductById);

// -------------------testinggg--------------


router.post('/createproduct', upload.array('image', 1), createProduct);
  
module.exports = router;
