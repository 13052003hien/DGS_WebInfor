import api, { ENDPOINTS } from '../config/api.config';

class LocationService {
    async getAllLocations() {
        try {
            const response = await api.get(ENDPOINTS.LOCATIONS.GET_ALL);
            return response.data;
        } catch (error) {
            console.error('Error fetching locations:', error);
            throw error;
        }
    }

    async getLocationById(id) {
        try {
            const response = await api.get(ENDPOINTS.LOCATIONS.GET_BY_ID(id));
            return response.data;
        } catch (error) {
            console.error(`Error fetching location ${id}:`, error);
            throw error;
        }
    }

    async createLocation(locationData) {
        try {
            const response = await api.post(ENDPOINTS.LOCATIONS.CREATE, locationData);
            return response.data;
        } catch (error) {
            console.error('Error creating location:', error);
            throw error;
        }
    }

    async updateLocation(id, locationData) {
        try {
            const response = await api.put(ENDPOINTS.LOCATIONS.UPDATE(id), locationData);
            return response.data;
        } catch (error) {
            console.error(`Error updating location ${id}:`, error);
            throw error;
        }
    }

    async deleteLocation(id) {
        try {
            const response = await api.delete(ENDPOINTS.LOCATIONS.DELETE(id));
            return response.data;
        } catch (error) {
            console.error(`Error deleting location ${id}:`, error);
            throw error;
        }
    }
}

export default new LocationService();
