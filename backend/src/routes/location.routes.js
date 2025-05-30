const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all locations
router.get('/', locationController.getAllLocations);

// Get a specific location
router.get('/:id', locationController.getLocationById);

// Create a new location (protected route - admin only)
router.post('/', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    locationController.createLocation
);

// Update a location (protected route - admin only)
router.put('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    locationController.updateLocation
);

// Delete a location (protected route - admin only)
router.delete('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    locationController.deleteLocation
);

module.exports = router;
