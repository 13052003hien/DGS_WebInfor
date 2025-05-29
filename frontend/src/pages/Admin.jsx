import React, { useState } from "react";
import {
  FaUsers,
  FaNewspaper,
  FaCog,
  FaChartLine,
  FaRegCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import UserManagement from "./UserManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className="fixed left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg z-10"
        style={{ top: "4rem" }}
      >
        <nav className="p-4">
          <div className="space-y-2">
            <a
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaChartLine className="mr-3 text-lg" />
              Bảng điều khiển
            </a>
            <a
              onClick={() => setActiveTab("users")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "users"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaUsers className="mr-3 text-lg" />
              Quản lý người dùng
            </a>
            <a
              onClick={() => setActiveTab("content")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "content"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaNewspaper className="mr-3 text-lg" />
              Quản lý nội dung
            </a>
            <a
              onClick={() => setActiveTab("settings")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaCog className="mr-3 text-lg" />
              Cài đặt hệ thống
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        <main className="container mx-auto px-6 py-8">
          {activeTab === "dashboard" && (
            <>
              {/* Top Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Tổng người dùng</p>
                      <h3 className="text-2xl font-bold mt-1">1,482</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                      <FaUsers className="text-2xl text-blue-500" />
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-4 flex items-center">
                    <span className="font-medium">↑ 12%</span>
                    <span className="ml-1">so với tháng trước</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Dự án hoạt động</p>
                      <h3 className="text-2xl font-bold mt-1">32</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                      <FaTasks className="text-2xl text-purple-500" />
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-4 flex items-center">
                    <span className="font-medium">↑ 8%</span>
                    <span className="ml-1">so với tháng trước</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Bài viết</p>
                      <h3 className="text-2xl font-bold mt-1">148</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                      <FaNewspaper className="text-2xl text-orange-500" />
                    </div>
                  </div>
                  <p className="text-green-500 text-sm mt-4 flex items-center">
                    <span className="font-medium">↑ 5%</span>
                    <span className="ml-1">so với tháng trước</span>
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Sự kiện</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                      <FaRegCalendarAlt className="text-2xl text-green-500" />
                    </div>
                  </div>
                  <p className="text-red-500 text-sm mt-4 flex items-center">
                    <span className="font-medium">↓ 2%</span>
                    <span className="ml-1">so với tháng trước</span>
                  </p>
                </div>
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-6">Hoạt động gần đây</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FaUsers className="text-blue-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Người dùng mới đăng ký</p>
                        <p className="text-sm text-gray-500 mt-1">2 phút trước</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                        <FaNewspaper className="text-purple-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Bài viết mới được đăng</p>
                        <p className="text-sm text-gray-500 mt-1">1 giờ trước</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                        <FaTasks className="text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <p className="font-medium">Cập nhật trạng thái dự án</p>
                        <p className="text-sm text-gray-500 mt-1">3 giờ trước</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-6">Thao tác nhanh</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
                        <FaUsers className="text-xl text-blue-500" />
                      </div>
                      <span className="text-sm font-medium">Thêm người dùng</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
                        <FaNewspaper className="text-xl text-purple-500" />
                      </div>
                      <span className="text-sm font-medium">Tạo bài viết</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
                        <FaTasks className="text-xl text-orange-500" />
                      </div>
                      <span className="text-sm font-medium">Thêm dự án</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3">
                        <FaRegCalendarAlt className="text-xl text-green-500" />
                      </div>
                      <span className="text-sm font-medium">Lịch sự kiện</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "users" && <UserManagement />}

          {activeTab === "content" && (
            // Content management tab content will go here
            <div></div>
          )}

          {activeTab === "settings" && (
            // Settings tab content will go here
            <div></div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
