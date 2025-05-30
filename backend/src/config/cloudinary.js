const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure storage for users
const userStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dgs-users',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 500, height: 500, crop: 'fill' }]
    }
});

// Configure storage for projects
const projectStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'dgs-projects',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 1200, height: 800, crop: 'fill' }]
    }
});

const uploadUser = multer({ storage: userStorage });
const uploadProject = multer({ storage: projectStorage });

module.exports = {
    cloudinary,
    uploadUser,
    uploadProject
};
