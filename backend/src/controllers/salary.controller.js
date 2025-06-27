const Salary = require('../models/salary.model');
const salaryService = require('../services/salary.service');
const { AppError } = require('../middlewares/error.middleware');

exports.uploadSalary = async (req, res, next) => {
    try {
        // Check user role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Không có quyền truy cập'
            });
        }

        // Check file existence
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng chọn file excel để tải lên'
            });
        }

        // Process the Excel file that's in memory
        const result = await salaryService.uploadSalaryFile(req.file);
        
        return res.status(200).json({
            success: true,
            message: 'File lương đã được xử lý thành công',
            data: result
        });
    } catch (error) {
        console.error('Error processing salary file:', error);
        
        // Send appropriate error response
        return res.status(500).json({ 
            success: false,
            message: 'Lỗi khi xử lý file lương',
            error: error.message,
            details: error.stack
        });
    }
};

exports.getSalaries = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new AppError('Không có quyền truy cập', 403);
        }

        const filters = {
            name: req.query.name,
            email: req.query.email,
            employeeId: req.query.employeeId,
            month: req.query.month,
            minAmount: req.query.minAmount,
            maxAmount: req.query.maxAmount
        };

        const salaries = await salaryService.getSalaries(filters);
        res.status(200).json({
            success: true,
            data: salaries
        });
    } catch (error) {
        next(error);
    }
};

exports.getUserSalary = async (req, res, next) => {
    try {
        const { email } = req.user;
        const salaries = await salaryService.getUserSalary(email);
        res.status(200).json({
            success: true,
            data: salaries
        });
    } catch (error) {
        next(error);
    }
};

exports.getSalaryStats = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            throw new AppError('Không có quyền truy cập', 403);
        }

        const { month } = req.query;
        const stats = await salaryService.getSalaryStats(month);
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        next(error);
    }
};
