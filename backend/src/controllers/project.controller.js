const projectService = require('../services/project.service');

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
}

module.exports = new ProjectController();
