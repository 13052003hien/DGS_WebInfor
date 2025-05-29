const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, createAdmin } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

// Admin routes
router.post('/create-admin', createAdmin);

module.exports = router;
