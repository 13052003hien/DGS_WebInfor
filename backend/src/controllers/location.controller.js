const locationService = require('../services/location.service');

class LocationController {
    async createLocation(req, res, next) {
        try {
            const location = await locationService.createLocation(req.body);
            res.status(201).json(location);
        } catch (error) {
            next(error);
        }
    }

    async getAllLocations(req, res, next) {
        try {
            const locations = await locationService.getAllLocations();
            res.json(locations);
        } catch (error) {
            next(error);
        }
    }

    async getLocationById(req, res, next) {
        try {
            const location = await locationService.getLocationById(req.params.id);
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
            res.json(location);
        } catch (error) {
            next(error);
        }
    }

    async updateLocation(req, res, next) {
        try {
            const location = await locationService.updateLocation(req.params.id, req.body);
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
            res.json(location);
        } catch (error) {
            next(error);
        }
    }

    async deleteLocation(req, res, next) {
        try {
            const location = await locationService.deleteLocation(req.params.id);
            if (!location) {
                return res.status(404).json({ message: 'Location not found' });
            }
            res.json({ message: 'Location deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new LocationController();
