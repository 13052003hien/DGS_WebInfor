const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary storage for avatars
const avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dgs-users',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'fill' }]
    }
});

// Configure memory storage for Excel files
const excelStorage = multer.memoryStorage();

// File filter for Excel files
const excelFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // .xlsx
        file.mimetype === 'application/vnd.ms-excel' || // .xls
        file.mimetype === 'text/csv') { // .csv
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file Excel (.xlsx, .xls) hoặc CSV'), false);
    }
};

// File filter for avatar images
const imageFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh'), false);
    }
};

// Configure multer for salary files
const uploadSalaryFile = multer({
    storage: excelStorage,
    fileFilter: excelFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single('file');

// Configure multer for avatar uploads
const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 2 * 1024 * 1024 // 2MB limit
    }
}).single('avatar');

// Middleware wrapper for salary file upload
const handleSalaryFileUpload = (req, res, next) => {
    uploadSalaryFile(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            console.error('Multer error:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File quá lớn. Giới hạn là 5MB'
                });
            }
            return res.status(400).json({
                message: `Lỗi upload file: ${err.message}`
            });
        } else if (err) {
            // An unknown error occurred when uploading
            console.error('Upload error:', err);
            return res.status(400).json({
                message: err.message || 'Lỗi khi upload file'
            });
        }

        // Check if file exists
        if (!req.file) {
            return res.status(400).json({
                message: 'Vui lòng chọn file để upload'
            });
        }

        console.log('File upload successful:', {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size
        });

        // File is valid, continue
        next();
    });
};

// Middleware wrapper for avatar upload
const handleAvatarUpload = (req, res, next) => {
    uploadAvatar(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    message: 'File ảnh quá lớn. Giới hạn là 2MB'
                });
            }
            return res.status(400).json({
                message: `Lỗi upload ảnh: ${err.message}`
            });
        } else if (err) {
            return res.status(400).json({
                message: err.message || 'Lỗi khi upload ảnh'
            });
        }
        next();
    });
};

// Export the middleware functions
module.exports = {
    handleAvatarUpload,
    handleSalaryFileUpload
};
