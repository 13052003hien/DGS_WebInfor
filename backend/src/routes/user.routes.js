const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getProfile, 
    updateProfile,
    uploadAvatar,
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require('../controllers/user.controller');
const { protect, admin } = require('../middlewares/auth.middleware');
const { handleAvatarUpload } = require('../middlewares/upload.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes (require authentication)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/avatar', protect, handleAvatarUpload, uploadAvatar);

// Admin routes (require authentication and admin role)
router.get('/', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.post('/create', protect, admin, createUser);
router.put('/:id', protect, admin, updateUserById);
router.delete('/:id', protect, admin, deleteUserById);

module.exports = router;
