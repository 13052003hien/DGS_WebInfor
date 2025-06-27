const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salary.controller');
const { protect } = require('../middlewares/auth.middleware');
const { handleSalaryFileUpload } = require('../middlewares/upload.middleware');

const { admin } = require('../middlewares/auth.middleware');

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Salary API is working' });
});

// Admin routes (require authentication and admin role)
router.post('/upload', protect, admin, handleSalaryFileUpload, salaryController.uploadSalary);
router.get('/all', protect, admin, salaryController.getSalaries);
router.get('/stats', protect, admin, salaryController.getSalaryStats);

// User routes (require authentication)
router.get('/my-salary', protect, salaryController.getUserSalary);

module.exports = router;
