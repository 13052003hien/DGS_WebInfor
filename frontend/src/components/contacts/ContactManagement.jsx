import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import contactService from '../../services/contact.service';

const ContactManagement = () => {
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            const data = await contactService.getAllContacts();
            setContacts(data);
        } catch (error) {
            toast.error('Error loading contacts');
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
                await contactService.updateContact(editId, formData);
                toast.success('Contact updated successfully');
            } else {
                await contactService.createContact(formData);
                toast.success('Contact created successfully');
            }
            resetForm();
            loadContacts();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error processing request');
        }
    };

    const handleEdit = (contact) => {
        setIsEditing(true);
        setEditId(contact._id);
        setFormData({
            name: contact.name,
            address: contact.address,
            phone: contact.phone,
            email: contact.email
        });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await contactService.deleteContact(id);
                toast.success('Contact deleted successfully');
                loadContacts();
            } catch (error) {
                toast.error('Error deleting contact');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            address: '',
            phone: '',
            email: ''
        });
        setIsEditing(false);
        setEditId(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Contact Management</h1>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
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
                        {isEditing ? 'Update Contact' : 'Create Contact'}
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

            {/* Contacts List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Phone</th>
                            <th className="p-3 text-left">Address</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id} className="border-t">
                                <td className="p-3">{contact.name}</td>
                                <td className="p-3">{contact.email}</td>
                                <td className="p-3">{contact.phone}</td>
                                <td className="p-3">{contact.address}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleEdit(contact)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
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

export default ContactManagement;
