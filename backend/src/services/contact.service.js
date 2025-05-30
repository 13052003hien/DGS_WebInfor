const Contact = require('../models/contact.model');

class ContactService {
    async createContact(contactData) {
        try {
            const contact = new Contact(contactData);
            return await contact.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllContacts() {
        try {
            return await Contact.find();
        } catch (error) {
            throw error;
        }
    }

    async getContactById(id) {
        try {
            return await Contact.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateContact(id, contactData) {
        try {
            return await Contact.findByIdAndUpdate(
                id,
                contactData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteContact(id) {
        try {
            return await Contact.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ContactService();
