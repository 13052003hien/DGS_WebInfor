const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        trim: true
    },
    month: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Salary', salarySchema);
