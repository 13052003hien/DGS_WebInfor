const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all projects
router.get('/', projectController.getAllProjects);

// Get a specific project
router.get('/:id', projectController.getProjectById);

// Create a new project (protected route - admin only)
router.post('/', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    projectController.createProject
);

// Update a project (protected route - admin only)
router.put('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    projectController.updateProject
);

// Delete a project (protected route - admin only)
router.delete('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    projectController.deleteProject
);

module.exports = router;
