const User = require('../models/user.model');

class UserService {
    async createUser(userData) {
        try {
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findByUsername(username) {
        try {
            return await User.findOne({ username });
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await User.findById(id).select('-password');
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true }
            ).select('-password');
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await User.find({}).select('-password');
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();
