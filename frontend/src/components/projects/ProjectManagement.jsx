import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import projectService from '../../services/project.service';
import locationService from '../../services/location.service';
import contactService from '../../services/contact.service';
import Toast from '../Toast';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [locations, setLocations] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [formData, setFormData] = useState({
        projectName: '',
        projectType: '',
        location: '',
        contact: '',
        salary: '',
        specificLocation: '',
        projectDetails: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', content: '' });
    const fileInputRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [projectsData, locationsData, contactsData] = await Promise.all([
                projectService.getAllProjects(),
                locationService.getAllLocations(),
                contactService.getAllContacts()
            ]);
            setProjects(projectsData);
            setLocations(locationsData);
            setContacts(contactsData);
        } catch (error) {
            toast.error('Error loading data');
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
                await projectService.updateProject(editId, formData);
                toast.success('Project updated successfully');
            } else {
                await projectService.createProject(formData);
                toast.success('Project created successfully');
            }
            resetForm();
            loadData();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error processing request');
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setEditId(project._id);
        setFormData({
            projectName: project.projectName,
            projectType: project.projectType,
            location: project.location._id,
            contact: project.contact._id,
            salary: project.salary,
            specificLocation: project.specificLocation,
            projectDetails: project.projectDetails
        });
        setSelectedProject(project);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(id);
                toast.success('Project deleted successfully');
                loadData();
            } catch (error) {
                toast.error('Error deleting project');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            projectName: '',
            projectType: '',
            location: '',
            contact: '',
            salary: '',
            specificLocation: '',
            projectDetails: ''
        });
        setIsEditing(false);
        setEditId(null);
        setSelectedProject(null);
    };

    const handleImageUpload = async (projectId, e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Validate files
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            setMessage({ type: 'error', content: 'Please upload only image files' });
            return;
        }

        // Validate total size (max 50MB)
        const totalSize = files.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > 50 * 1024 * 1024) {
            setMessage({ type: 'error', content: 'Total image size should be less than 50MB' });
            return;
        }

        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        setLoading(true);
        try {
            const result = await projectService.uploadProjectImages(projectId, formData);
            setMessage({ type: 'success', content: 'Images uploaded successfully' });
            // Update project images in state
            if (selectedProject) {
                setSelectedProject({
                    ...selectedProject,
                    images: [...selectedProject.images, ...result.images]
                });
            }
        } catch (error) {
            setMessage({ type: 'error', content: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleImageDelete = async (projectId, imageId) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        setLoading(true);
        try {
            await projectService.deleteProjectImage(projectId, imageId);
            setMessage({ type: 'success', content: 'Image deleted successfully' });
            // Remove image from state
            if (selectedProject) {
                setSelectedProject({
                    ...selectedProject,
                    images: selectedProject.images.filter(img => img.public_id !== imageId)
                });
            }
        } catch (error) {
            setMessage({ type: 'error', content: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Project Management</h1>
            
            {/* Project Form */}
            <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-2">Project Name</label>
                        <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Project Type</label>
                        <input
                            type="text"
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Location</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Location</option>
                            {locations.map(location => (
                                <option key={location._id} value={location._id}>
                                    {location.locationName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Contact</label>
                        <select
                            name="contact"
                            value={formData.contact}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        >
                            <option value="">Select Contact</option>
                            {contacts.map(contact => (
                                <option key={contact._id} value={contact._id}>
                                    {contact.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Specific Location</label>
                        <input
                            type="text"
                            name="specificLocation"
                            value={formData.specificLocation}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block mb-2">Project Details</label>
                        <textarea
                            name="projectDetails"
                            value={formData.projectDetails}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            rows="4"
                            required
                        />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {isEditing ? 'Update Project' : 'Create Project'}
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

            {/* Projects List */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Project Name</th>
                            <th className="p-3 text-left">Type</th>
                            <th className="p-3 text-left">Location</th>
                            <th className="p-3 text-left">Contact</th>
                            <th className="p-3 text-left">Salary</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id} className="border-t">
                                <td className="p-3">{project.projectName}</td>
                                <td className="p-3">{project.projectType}</td>
                                <td className="p-3">{project.location?.locationName}</td>
                                <td className="p-3">{project.contact?.name}</td>
                                <td className="p-3">{project.salary}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
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

            {/* Project Images */}
            {selectedProject && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Project Images</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedProject.images?.map((image) => (
                            <div key={image.public_id} className="relative group">
                                <img
                                    src={image.url}
                                    alt="Project"
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => handleImageDelete(selectedProject._id, image.public_id)}
                                    disabled={loading}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        <div className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg">
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={loading}
                                className="p-4 text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                </svg>
                                <span>Add Images</span>
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => handleImageUpload(selectedProject._id, e)}
                                className="hidden"
                                accept="image/*"
                                multiple
                            />
                        </div>
                    </div>
                </div>
            )}

            {message.content && (
                <Toast 
                    type={message.type}
                    message={message.content}
                    onClose={() => setMessage({ type: '', content: '' })}
                />
            )}
        </div>
    );
};

export default ProjectManagement;
