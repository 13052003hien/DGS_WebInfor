import React from 'react';

const Admin = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">User Management</h2>
                    <p className="text-gray-600">Manage user accounts and permissions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Content Management</h2>
                    <p className="text-gray-600">Manage website content and pages</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">System Settings</h2>
                    <p className="text-gray-600">Configure system settings and preferences</p>
                </div>
            </div>
        </>
    );
};

export default Admin;
