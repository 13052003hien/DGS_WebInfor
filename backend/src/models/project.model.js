const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    projectType: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    specificLocation: {
        type: String,
        required: true
    },
    projectDetails: {
        type: String,
        required: true
    },    createdAt: {
        type: Date,
        default: Date.now
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
