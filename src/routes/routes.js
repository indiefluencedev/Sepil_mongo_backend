// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controller/AdminController'); 
const  {registeruser} = require('../controller/userController'); 
const  {createProduct} = require('../controller/productController'); 
const  {getProductById} = require('../controller/productController'); 
const upload = require('../middleware/multerconfig');

// ----------------------------------------------- login route----------------------------------------------------------------//
router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/registeruser',registeruser);
router.post('/createproduct',upload.single('image'), createProduct);
router.get("/products", getProductById)

module.exports = router;
