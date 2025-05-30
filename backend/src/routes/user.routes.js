const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect, admin } = require('../middlewares/auth.middleware');
const { handleUpload } = require('../middlewares/upload.middleware');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (require authentication)
router.get('/profile', protect, userController.getProfile);
router.put('/profile', protect, userController.updateProfile);
router.post('/avatar', protect, handleUpload, userController.uploadAvatar);
router.post('/refresh-token', protect, userController.refreshToken);

// Admin routes (require authentication and admin role)
router.get('/', protect, admin, userController.getAllUsers);
router.get('/:id', protect, admin, userController.getUserById);
router.post('/create', protect, admin, userController.createUser);
router.put('/:id', protect, admin, userController.updateUserById);
router.delete('/:id', protect, admin, userController.deleteUserById);
router.post('/create-admin', protect, admin, userController.createAdmin);

module.exports = router;
