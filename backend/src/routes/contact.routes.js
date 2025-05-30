const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Get all contacts
router.get('/', contactController.getAllContacts);

// Get a specific contact
router.get('/:id', contactController.getContactById);

// Create a new contact (protected route - admin only)
router.post('/', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    contactController.createContact
);

// Update a contact (protected route - admin only)
router.put('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    contactController.updateContact
);

// Delete a contact (protected route - admin only)
router.delete('/:id', 
    authMiddleware.protect, 
    authMiddleware.admin, 
    contactController.deleteContact
);

module.exports = router;
