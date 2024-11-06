const multer = require('multer');
const path = require('path');

// Set up Multer storage and options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

// Set up Multer middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: fileFilter
}).single('image'); // Set the field name to "image"

module.exports = (req, res, next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: "File upload error", error: err.message });
        }
        next();
    });
};
