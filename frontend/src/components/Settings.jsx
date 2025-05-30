import React from 'react';

const Settings = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Cài đặt hệ thống</h1>
            
            <div className="bg-white rounded-lg shadow divide-y">
                {/* General Settings */}
                <div className="p-6">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">Cài đặt chung</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tên website
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Nhập tên website"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Mô tả
                            </label>
                            <textarea
                                rows={3}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Nhập mô tả website"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="p-6">
                    <h2 className="text-xl font-medium text-gray-900 mb-4">Thông tin liên hệ</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email liên hệ
                            </label>
                            <input
                                type="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="contact@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Số điện thoại
                            </label>
                            <input
                                type="tel"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Nhập số điện thoại"
                            />
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="p-6">
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
