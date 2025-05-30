import { apiClient as api, ENDPOINTS } from '../config/api.config';

class LocationService {
    async getAllLocations() {
        const response = await api.get(ENDPOINTS.LOCATIONS.GET_ALL);
        return response.data;
    }

    async getLocationById(id) {
        const response = await api.get(ENDPOINTS.LOCATIONS.GET_BY_ID(id));
        return response.data;
    }

    async createLocation(locationData) {
        const response = await api.post(ENDPOINTS.LOCATIONS.CREATE, locationData);
        return response.data;
    }

    async updateLocation(id, locationData) {
        const response = await api.put(ENDPOINTS.LOCATIONS.UPDATE(id), locationData);
        return response.data;
    }

    async deleteLocation(id) {
        const response = await api.delete(ENDPOINTS.LOCATIONS.DELETE(id));
        return response.data;
    }
}

export default new LocationService();
