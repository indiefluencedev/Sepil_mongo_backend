const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer'); 
const {generateOTP,sendOTPEmail} = require("./verifyotp")

const createUser = async (req, res) => {
    try {
        const { name, email, phone, password, isAdmin, isVerified } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });
        console.log(existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate OTP
        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            isAdmin: isAdmin || false, 
            isVerified: false,
            otp,
            otpExpiry,
        });

        await newUser.save();

        // Send OTP via email
        await sendOTPEmail(email, otp);
        console.log(email)
        
        res.status(201).json({
            message: 'User created successfully..',
        });
    } catch (error) {
        console.error('Error creating user:', error); 
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

 
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email before logging in.' });
        }

        // Compare the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password!' });
        }

        // Check if the user is an admin
        if (user.isAdmin) {
            // Return admin-specific data or interface
            res.status(200).json({
                message: 'This Will Be Your Admin!',
                user: {
                    name: user.name,
                    role: 'admin',
                    email:user.email,
                    phone: user.phone
                },
            });
        } else {
            res.status(200).json({
                message: 'This Will Be Your User Dashboard!',
                user: {
                    name: user.name,
                    role: 'user',
                    email:user.email,
                    phone: user.phone
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const email = req.query.email;
        console.log(email);

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'User email not verified.' });
        }

        // Send only the necessary fields
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone || "",
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateUserProfile = async (req, res) => {
    const { email } = req.body;
    const { name, address, mobileNo } = req.body;
  
    try {
      // Find the user by email
      const user = await userModel.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      // Update user details
      user.name = name || user.name;
      user.address = address || user.address;
      user.mobileNo = mobileNo || user.mobileNo;
  
      // Save the updated user information
      await user.save();
  
      res.status(200).json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating profile', error: error.message });
    }
  };


module.exports = { createUser, loginUser , getAllUsers,updateUserProfile };
