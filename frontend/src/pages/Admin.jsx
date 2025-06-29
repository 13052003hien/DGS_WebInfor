import React, { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaCog,
  FaChartLine,
  FaMapMarkerAlt,
  FaTasks,
  FaAddressBook,
} from "react-icons/fa";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname.split("/").pop() || "dashboard"
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "dashboard") {
      navigate("/admin");
    } else {
      navigate(`/admin/${tab}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className="fixed left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg z-10"
        style={{ top: "4rem" }}
      >
        <nav className="p-4">
          <div className="space-y-2">
            {/* <a
              onClick={() => handleTabChange("dashboard")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "dashboard"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaChartLine className="mr-3 text-lg" />
              Bảng điều khiển
            </a> */}

             <a
              onClick={() => handleTabChange("salaries")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "salaries"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaUsers className="mr-3 text-lg" />
              Bảng lương
            </a>

            <a
              onClick={() => handleTabChange("users")}
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
              onClick={() => handleTabChange("projects")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "projects"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaTasks className="mr-3 text-lg" />
              Quản lý dự án
            </a>
            <a
              onClick={() => handleTabChange("locations")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "locations"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaMapMarkerAlt className="mr-3 text-lg" />
              Quản lý địa điểm
            </a>
            <a
              onClick={() => handleTabChange("contacts")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "contacts"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaAddressBook className="mr-3 text-lg" />
              Quản lý liên hệ
            </a>
            <a
              onClick={() => handleTabChange("settings")}
              className={`flex items-center p-3 text-gray-700 hover:bg-blue-50 cursor-pointer rounded-lg ${
                activeTab === "settings"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : ""
              }`}
            >
              <FaCog className="mr-3 text-lg" />
              Cài đặt
            </a>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;
