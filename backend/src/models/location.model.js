const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
