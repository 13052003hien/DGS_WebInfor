const User = require('../models/user.model');
const { generateToken } = require('../config/jwt');
const userService = require('../services/user.service');
const { cloudinary } = require('../config/cloudinary');

// Register new user
const register = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }        // Create new user
        const user = await User.create({
            username,
            email,
            password,
            fullName
        });
        
        // Generate JWT token
        const token = generateToken(user._id, user.role);

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            imageUrl: user.imageUrl,
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

        // Check if user is active
        if (user.status === 'Tạm khóa') {
            return res.status(403).json({ message: 'Your account has been suspended' });
        }

        // Generate JWT token with user role
        const token = generateToken(user._id, user.role);        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            status: user.status,
            imageUrl: user.imageUrl, // Thêm trường imageUrl vào response
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
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Upload avatar
const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const userToUpdate = await User.findById(req.user._id);
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If user already has an image, delete it from Cloudinary
        if (userToUpdate.imageUrl) {
            // Extract public_id from the URL
            const public_id = userToUpdate.imageUrl.split('/').pop().split('.')[0];
            if (public_id) {
                await cloudinary.uploader.destroy(public_id);
            }
        }

        // Update user with new image URL
        userToUpdate.imageUrl = req.file.path;
        await userToUpdate.save();

        res.json({
            message: 'Avatar uploaded successfully',
            imageUrl: userToUpdate.imageUrl
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const { fullName, email } = req.body;
        const userToUpdate = await User.findById(req.user._id);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (fullName) userToUpdate.fullName = fullName;
        if (email) userToUpdate.email = email;

        await userToUpdate.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                _id: userToUpdate._id,
                username: userToUpdate.username,
                email: userToUpdate.email,
                fullName: userToUpdate.fullName,
                avatar: userToUpdate.avatar
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create admin user
const createAdmin = async (req, res) => {
    try {
        const { username, email, password, fullName } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new admin user
        const user = await User.create({
            username,
            email,
            password,
            fullName,
            role: 'admin'
        });

        // Generate JWT token
        const token = generateToken(user._id, user.role);

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

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user (for admin)
const createUser = async (req, res) => {
    try {
        const { username, email, password, fullName, role, status } = req.body;

        // Check if user already exists
        const userExists = await userService.findByUsername(username);
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await userService.createUser({
            username,
            email,
            password,
            fullName,
            role: role || 'user',
            status: status || 'Hoạt động'
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
            status: user.status
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID (for admin)
const updateUserById = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID (for admin)
const deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        res.json(result);
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

// Refresh token
const refreshToken = async (req, res) => {
    try {
        // User already verified in protect middleware
        const user = req.user;
        const token = generateToken(user._id);
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error refreshing token' });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    updateProfile,
    createAdmin,
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    refreshToken,
    uploadAvatar
};
