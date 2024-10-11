const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/routes/routes'); 
const connectDB = require('./config/db'); 
const cors = require('cors');

dotenv.config(); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/", routes);


// Define port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
