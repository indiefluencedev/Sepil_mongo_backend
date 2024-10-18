// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Create a new user (existing code)
createUser = async (req, res) => {
    try {
        const { name, email, phone, password,isAdmin} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists." });
        }
            const newUser = new User({
                name,
                email,
                phone,
                password,
                isAdmin,  
            });
    
            await newUser.save();
            res.status(201).json({
                message: 'User created successfully',
                user: newUser,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });

    };
};

// Login user (new code)
loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by username and password (Basic authentication)
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Check if the user is an admin
        if (user.isAdmin) {
            // Return admin-specific data or interface
            res.status(200).json({
                message: 'This Will Be Your Admin!',
                user: {
                    username: user.username,
                    role: 'admin',
                },
            });
        } else {
            res.status(200).json({
                message: 'This Will Be Your User Dashboard!',
                user: {
                    username: user.username,
                    role: 'user',
                },
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

module.exports  ={createUser,loginUser}