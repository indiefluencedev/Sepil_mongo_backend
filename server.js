const express = require('express');
const app = express();
const dotenv = require('dotenv');
const route = require('./src/routes/routes'); 
const connectDB = require('./config/db'); 
const multer = require("multer");
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Set up uploads directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

dotenv.config(); 
setInterval(() => {
  const memoryUsage = process.memoryUsage();
  console.log(`Memory Usage: RSS=${memoryUsage.rss} heapTotal=${memoryUsage.heapTotal} heapUsed=${memoryUsage.heapUsed}`);
}, 10000);


// Middleware
app.use(express.json());
app.use('/uploads', express.static(uploadDir)); 
app.use(cors());

// Connect to Database
connectDB();

// Use routes
app.use('/', route); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
