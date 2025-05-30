const projectService = require('../services/project.service');
const Project = require('../models/project.model');
const { cloudinary } = require('../config/cloudinary');

class ProjectController {
    async createProject(req, res, next) {
        try {
            const project = await projectService.createProject(req.body);
            res.status(201).json(project);
        } catch (error) {
            next(error);
        }
    }

    async getAllProjects(req, res, next) {
        try {
            const projects = await projectService.getAllProjects();
            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    async getProjectById(req, res, next) {
        try {
            const project = await projectService.getProjectById(req.params.id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json(project);
        } catch (error) {
            next(error);
        }
    }

    async updateProject(req, res, next) {
        try {
            const project = await projectService.updateProject(req.params.id, req.body);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json(project);
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const project = await projectService.deleteProject(req.params.id);
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            res.json({ message: 'Project deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    // Upload project images
    async uploadProjectImages(req, res) {
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            const projectId = req.params.projectId;
            const project = await Project.findById(projectId);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            // Process uploaded files
            const uploadedImages = req.files.map(file => ({
                url: file.path,
                public_id: file.filename
            }));

            // Add new images to existing ones
            project.images = [...(project.images || []), ...uploadedImages];
            await project.save();

            res.json({
                message: 'Images uploaded successfully',
                images: project.images
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Delete project image
    async deleteProjectImage(req, res) {
        try {
            const { projectId, imageId } = req.params;
            const project = await Project.findById(projectId);

            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const imageToDelete = project.images.find(img => img.public_id === imageId);
            if (!imageToDelete) {
                return res.status(404).json({ message: 'Image not found' });
            }

            // Delete from Cloudinary
            await cloudinary.uploader.destroy(imageToDelete.public_id);

            // Remove from project
            project.images = project.images.filter(img => img.public_id !== imageId);
            await project.save();

            res.json({
                message: 'Image deleted successfully',
                images: project.images
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProjectController();
