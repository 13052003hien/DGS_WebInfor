import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import locationService from '../../services/location.service';

const LocationManagement = () => {
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        locationName: '',
        country: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadLocations();
    }, []);

    const loadLocations = async () => {
        try {
            const data = await locationService.getAllLocations();
            setLocations(data);
        } catch (error) {
            toast.error('Error loading locations');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await locationService.updateLocation(editId, formData);
                toast.success('Location updated successfully');
            } else {
                await locationService.createLocation(formData);
                toast.success('Location created successfully');
            }
            resetForm();
            loadLocations();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error processing request');
        }
    };

    const handleEdit = (location) => {
        setIsEditing(true);
        setEditId(location._id);
        setFormData({
            locationName: location.locationName,
            country: location.country
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this location?')) {
            try {
                await locationService.deleteLocation(id);
                toast.success('Location deleted successfully');
                loadLocations();
            } catch (error) {
                toast.error('Error deleting location');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            locationName: '',
            country: ''
        });
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Location Management</h1>
            
            {/* Location Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Location Name</label>
                        <input
                            type="text"
                            name="locationName"
                            value={formData.locationName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Update Location' : 'Create Location'}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Locations List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Location Name</th>
                            <th className="p-3 text-left">Country</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations.map(location => (
                            <tr key={location._id} className="border-t">
                                <td className="p-3">{location.locationName}</td>
                                <td className="p-3">{location.country}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleEdit(location)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(location._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LocationManagement;
