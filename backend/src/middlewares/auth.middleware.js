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
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        try {
            // Verify token
            const decoded = verifyToken(token);

            // Get user from token with role information
            const user = await User.findById(decoded.id).select('-password');
            if (!user) {
                return res.status(401).json({ message: 'Not authorized, user not found' });
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
                    message: 'Token expired',
                    code: 'TOKEN_EXPIRED'
                });
            }
            throw error;
        }
    } catch (error) {
        res.status(401).json({ message: 'Not authorized, token failed' });
    }
};

// Admin check middleware
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') { // Sửa thành chữ thường
        next();
    } else {
        res.status(403).json({ 
            message: 'Not authorized as admin',
            userRole: req.user ? req.user.role : 'none' // Thêm thông tin để debug
        });
    }
};

module.exports = { protect, admin };