import React from 'react';

const Dashboard = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Bảng điều khiển</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Summary Cards */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tổng số dự án</h3>
                    <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tổng số địa điểm</h3>
                    <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Tổng số liên hệ</h3>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Hoạt động gần đây</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 text-center text-gray-500">
                        Chưa có hoạt động nào
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
