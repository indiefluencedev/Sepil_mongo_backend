const nodemailer = require('nodemailer');

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 2 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // Check if the OTP matches and is not expired
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        if (user.otpExpiry < new Date()) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Update the user to set isVerified to true and remove the OTP fields
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        res.status(200).json({ message: 'User verified successfully.' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Error verifying OTP', error: error.message });
    }
};

module.exports = {generateOTP,sendOTPEmail,verifyOTP};
