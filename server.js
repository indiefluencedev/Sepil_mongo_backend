const express = require('express');
const app = express();
const dotenv = require('dotenv');
const route = require('./src/routes/routes'); 
const connectDB = require('./config/db'); 
const multer = require("multer")
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

dotenv.config(); 

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images
app.use(multer().any());
app.use(cors());
connectDB();
// Use routes
app.use('/', route); // Adjust the path prefix if needed


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));