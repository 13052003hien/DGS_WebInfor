const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

const generateToken = (id, role) => {
    return jwt.sign(
        { 
            id, 
            role // Make sure role is included in token payload
        },
        JWT_SECRET,
        { expiresIn: '2h' } // Giảm thời gian hết hạn xuống 2 giờ
    );
};

const generateRefreshToken = (id, role) => {
    return jwt.sign(
        { 
            id,
            role // Include role in refresh token as well
        },
        JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // Refresh token có thời hạn 7 ngày
    );
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            error.code = 'TOKEN_EXPIRED';
        }
        throw error;
    }
};

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    generateToken,
    generateRefreshToken,
    verifyToken,
    verifyRefreshToken
};