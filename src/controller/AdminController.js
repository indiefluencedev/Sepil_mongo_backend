const Admin = require("../models/AdminModel")
const bcrypt = require('bcryptjs');




exports.registerAdmin = async (req, res) => {
    const data = req.body;
    console.log(data)

    let {email, password } = data

    try {

        const admin = await Admin.findOne({ email });
        
        if (admin) {
            return res.status(400).json({ msg: 'Email Already Registered' });
        }

        const newAdmin = await Admin.create(data)

        return res.status(200).send({ status: true, message: "Admin registered successfully", data: newAdmin })
    } catch (err) {
        res.status(500).json({ msg: err });
    }
};
// Admin login controller
exports.loginAdmin = async (req, res) => {
    const data = req.body;
    console.log(data)
    let {email, password } = data
    try {
        // Check if admin exists
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid email or password' });
        }
        else{
            let userLogin = await Admin.create(data)

            return res.status(200).send({ status: true, message: "User login successfull", data: userLogin })

    }
        

        // // Generate JWT
        // const token = jwt.sign(
        //     { id: admin._id },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );

        // res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' });
    }
};

