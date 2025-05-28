const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = await User.create({
            username,
            email,
            password,
            fullName
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1d'
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '1d'
        });

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.email = req.body.email || user.email;
        user.fullName = req.body.fullName || user.fullName;
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            fullName: updatedUser.fullName,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = (req, res) => {
  const users = userService.getAll();
  res.json(users);
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile
};
