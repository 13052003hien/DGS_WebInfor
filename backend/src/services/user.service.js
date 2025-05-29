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
            const user = await User.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            user.username = updateData.username || user.username;
            user.email = updateData.email || user.email;
            user.fullName = updateData.name || user.fullName;
            user.role = updateData.role || user.role;
            user.status = updateData.status || user.status;

            if (updateData.password) {
                user.password = updateData.password;
            }

            await user.save();
            return user.toObject();
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id) {
        try {
            const user = await User.findById(id);
            if (!user) {
                throw new Error('User not found');
            }
            await user.deleteOne();
            return { message: 'User deleted successfully' };
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
