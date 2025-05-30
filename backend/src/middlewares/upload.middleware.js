const multer = require('multer');
const { cloudinary, uploadUser } = require('../config/cloudinary');

const uploadUserAvatar = uploadUser.single('avatar');

const handleUpload = (req, res, next) => {
    uploadUserAvatar(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: 'File upload error' });
        } else if (err) {
            return res.status(500).json({ message: err.message });
        }
        next();
    });
};

module.exports = { handleUpload };
