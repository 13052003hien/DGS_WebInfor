const Location = require('../models/location.model');

class LocationService {
    async createLocation(locationData) {
        try {
            const location = new Location(locationData);
            return await location.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllLocations() {
        try {
            return await Location.find();
        } catch (error) {
            throw error;
        }
    }

    async getLocationById(id) {
        try {
            return await Location.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async updateLocation(id, locationData) {
        try {
            return await Location.findByIdAndUpdate(
                id,
                locationData,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteLocation(id) {
        try {
            return await Location.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new LocationService();
