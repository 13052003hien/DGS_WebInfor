const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/connection');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const locationRoutes = require('./routes/location.routes');
const contactRoutes = require('./routes/contact.routes');
const salaryRoutes = require('./routes/salary.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Logging middleware
app.use(logger('dev'));

// CORS configuration with more options
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'], // Allow both localhost and IP
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Requested-With', 'Authorization'],
    credentials: true,
    maxAge: 86400 // Cache preflight requests for 24 hours
}));

// Parse JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Request logging for debugging auth issues
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - Auth Header: ${req.headers.authorization || 'none'}`);
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Files:', req.files || req.file);
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/salary', salaryRoutes);

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation Error',
            errors: Object.values(err.errors).map(e => e.message)
        });
    }
    
    if (err.name === 'UnauthorizedError' || err.status === 401) {
        return res.status(401).json({
            message: 'Unauthorized',
            error: err.message
        });
    }
    
    if (err.name === 'ForbiddenError' || err.status === 403) {
        return res.status(403).json({
            message: 'Forbidden',
            error: err.message
        });
    }

    // Default error
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

module.exports = app;
