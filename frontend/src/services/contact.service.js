import api from '../config/api.config';

class ContactService {
    async getAllContacts() {
        const response = await api.get('/contacts');
        return response.data;
    }

    async getContactById(id) {
        const response = await api.get(`/contacts/${id}`);
        return response.data;
    }

    async createContact(contactData) {
        const response = await api.post('/contacts', contactData);
        return response.data;
    }

    async updateContact(id, contactData) {
        const response = await api.put(`/contacts/${id}`, contactData);
        return response.data;
    }

    async deleteContact(id) {
        const response = await api.delete(`/contacts/${id}`);
        return response.data;
    }
}

export default new ContactService();
