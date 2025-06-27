const User = require('../models/user.model');
const { verifyToken, generateToken } = require('../config/jwt');

// Protect routes middleware
const protect = async (req, res, next) => {
    try {
        // Get token from header
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Vui lòng đăng nhập' });
        }

        try {
            // Verify token
            const decoded = verifyToken(token);

            // Get user from token with role information
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Tài khoản không tồn tại' });
            }

            const tokenExp = decoded.exp * 1000; 
            const now = Date.now();
            const fiveMinutes = 5 * 60 * 1000;

            if (tokenExp - now < fiveMinutes) {
                const newToken = generateToken(user._id, user.role);
                res.setHeader('X-New-Token', newToken);
            }

            // Add user to request
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: 'Token hết hạn',
                    code: 'TOKEN_EXPIRED'
                });
            }
            return res.status(401).json({ message: 'Token không hợp lệ' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Lỗi xác thực' });
    }
};

// Admin check middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ 
            message: 'Không có quyền truy cập',
            userRole: req.user ? req.user.role : 'none'
        });
    }
};

module.exports = { protect, admin };