const Project = require('../models/project.model');

class ProjectService {
    async createProject(projectData) {
        try {
            const project = new Project(projectData);
            return await project.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllProjects() {
        try {
            return await Project.find()
                .populate('location')
                .populate('contact');
        } catch (error) {
            throw error;
        }
    }

    async getProjectById(id) {
        try {
            return await Project.findById(id)
                .populate('location')
                .populate('contact');
        } catch (error) {
            throw error;
        }
    }

    async updateProject(id, projectData) {
        try {
            return await Project.findByIdAndUpdate(
                id,
                projectData,
                { new: true, runValidators: true }
            ).populate('location').populate('contact');
        } catch (error) {
            throw error;
        }
    }

    async deleteProject(id) {
        try {
            return await Project.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ProjectService();
