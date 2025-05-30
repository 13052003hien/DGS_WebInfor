import { apiClient as api, ENDPOINTS } from '../config/api.config';

class ProjectService {
    async getAllProjects() {
        const response = await api.get(ENDPOINTS.PROJECTS.GET_ALL);
        return response.data;
    }

    async getProjectById(id) {
        const response = await api.get(ENDPOINTS.PROJECTS.GET_BY_ID(id));
        return response.data;
    }

    async createProject(projectData) {
        const response = await api.post(ENDPOINTS.PROJECTS.CREATE, projectData);
        return response.data;
    }

    async updateProject(id, projectData) {
        const response = await api.put(ENDPOINTS.PROJECTS.UPDATE(id), projectData);
        return response.data;
    }

    async deleteProject(id) {
        const response = await api.delete(ENDPOINTS.PROJECTS.DELETE(id));
        return response.data;
    }
}

export default new ProjectService();
