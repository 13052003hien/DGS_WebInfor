import { apiClient as api, ENDPOINTS } from '../config/api.config';

class ContactService {
    async getAllContacts() {
        const response = await api.get(ENDPOINTS.CONTACTS.GET_ALL);
        return response.data;
    }

    async getContactById(id) {
        const response = await api.get(ENDPOINTS.CONTACTS.GET_BY_ID(id));
        return response.data;
    }

    async createContact(contactData) {
        const response = await api.post(ENDPOINTS.CONTACTS.CREATE, contactData);
        return response.data;
    }

    async updateContact(id, contactData) {
        const response = await api.put(ENDPOINTS.CONTACTS.UPDATE(id), contactData);
        return response.data;
    }

    async deleteContact(id) {
        const response = await api.delete(ENDPOINTS.CONTACTS.DELETE(id));
        return response.data;
    }
}

export default new ContactService();
