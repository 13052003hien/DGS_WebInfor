const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const { uploadProject } = require('../config/cloudinary');

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

// Project image upload routes (protected - admin only)
router.post('/:projectId/images',
    authMiddleware.protect,
    authMiddleware.admin,
    uploadProject.array('images', 10),
    projectController.uploadProjectImages
);

router.delete('/:projectId/images/:imageId',
    authMiddleware.protect,
    authMiddleware.admin,
    projectController.deleteProjectImage
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
