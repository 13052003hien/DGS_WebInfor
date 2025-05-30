const contactService = require('../services/contact.service');

class ContactController {
    async createContact(req, res, next) {
        try {
            const contact = await contactService.createContact(req.body);
            res.status(201).json(contact);
        } catch (error) {
            next(error);
        }
    }

    async getAllContacts(req, res, next) {
        try {
            const contacts = await contactService.getAllContacts();
            res.json(contacts);
        } catch (error) {
            next(error);
        }
    }

    async getContactById(req, res, next) {
        try {
            const contact = await contactService.getContactById(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }

    async updateContact(req, res, next) {
        try {
            const contact = await contactService.updateContact(req.params.id, req.body);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.json(contact);
        } catch (error) {
            next(error);
        }
    }

    async deleteContact(req, res, next) {
        try {
            const contact = await contactService.deleteContact(req.params.id);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.json({ message: 'Contact deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ContactController();
