import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Properties from "./Properties";
import Users from "./Users";
import MainPanel from "./MainPanel";
import { authService } from "../../services/api";

// Icons from lucide-react
import {
  Home,
  LayoutGrid,
  Users as UsersIcon,
  LogOut,
  Settings,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
  HelpCircle,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarWidth = isSidebarOpen ? "w-72" : "w-20";
  const contentWidth = isSidebarOpen ? "md:ml-72" : "md:ml-20";
  return (
    <div className="flex h-screen bg-[#f9f7f5]">
      {/* Sidebar overlay for mobile */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${sidebarWidth} z-30`}
        initial={false}
        animate={{
          width: isSidebarOpen ? (isMobile ? "85%" : 288) : 80,
          x: isMobile && !isSidebarOpen ? -80 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#e8e1d9] bg-[#947054] text-white">
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center"
              >
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center mr-3">
                  <span className="text-[#947054] font-serif font-bold">
                    RE
                  </span>
                </div>
                <h2 className="text-xl font-serif">Prime Estates</h2>
              </motion.div>
            )}
            <button
              className="p-2 rounded-md hover:bg-[#7d5e47] text-white transition-colors"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>{" "}
          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4 pb-3">
              {isSidebarOpen && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-[#e8e1d9] text-sm focus:outline-none focus:ring-1 focus:ring-[#947054] focus:border-[#947054]"
                  />
                  <Search
                    size={16}
                    className="absolute left-3 top-2.5 text-gray-400"
                  />
                </div>
              )}
            </div>

            <div className="px-3 mb-2">
              {isSidebarOpen && (
                <p className="text-xs font-medium text-gray-400 mb-2 pl-3">
                  MAIN MENU
                </p>
              )}
            </div>

            <ul className="space-y-1 px-3">
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("overview")}
                >
                  <LayoutGrid
                    size={20}
                    className={
                      activeTab === "overview" ? "text-white" : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Overview
                    </motion.span>
                  )}
                  {isSidebarOpen && activeTab === "overview" && (
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "properties"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("properties")}
                >
                  <Home
                    size={20}
                    className={
                      activeTab === "properties"
                        ? "text-white"
                        : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Properties
                    </motion.span>
                  )}
                  {isSidebarOpen && activeTab === "properties" && (
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "users"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("users")}
                >
                  <UsersIcon
                    size={20}
                    className={
                      activeTab === "users" ? "text-white" : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Users
                    </motion.span>
                  )}
                  {isSidebarOpen && activeTab === "users" && (
                    <ChevronRight className="ml-auto" size={16} />
                  )}
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "calendar"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("calendar")}
                >
                  <Calendar
                    size={20}
                    className={
                      activeTab === "calendar" ? "text-white" : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Calendar
                    </motion.span>
                  )}
                </button>
              </li>
            </ul>

            {/* <div className="px-3 mt-6 mb-2">
              {isSidebarOpen && (
                <p className="text-xs font-medium text-gray-400 mb-2 pl-3">
                  SETTINGS
                </p>
              )}
            </div>

            <ul className="space-y-1 px-3">
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "settings"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("settings")}
                >
                  <Settings
                    size={20}
                    className={
                      activeTab === "settings" ? "text-white" : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Settings
                    </motion.span>
                  )}
                </button>
              </li>
              <li>
                <button
                  className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                    activeTab === "help"
                      ? "bg-[#947054] text-white"
                      : "hover:bg-[#f9f7f5] text-gray-700"
                  }`}
                  onClick={() => handleTabChange("help")}
                >
                  <HelpCircle
                    size={20}
                    className={
                      activeTab === "help" ? "text-white" : "text-[#947054]"
                    }
                  />
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="ml-3 font-medium"
                    >
                      Help & Support
                    </motion.span>
                  )}
                </button>
              </li>
            </ul> */}
          </nav>{" "}
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#e8e1d9] mt-auto">
            {isSidebarOpen && (
              <div className="bg-[#f9f7f5] rounded-lg p-3 mb-4 flex items-center">
                <img
                  src="https://i.pravatar.cc/150?img=2"
                  alt="Admin"
                  className="w-10 h-10 rounded-full border-2 border-[#947054]"
                />
                <div className="ml-3">
                  <p className="font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
            )}
            <Link
              to="/"
              className="flex items-center p-3 rounded-lg hover:bg-[#f9f7f5] text-gray-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Home size={20} className="text-[#947054]" />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-3 font-medium"
                >
                  View Website
                </motion.span>
              )}
            </Link>{" "}
            <button
              className="flex items-center w-full p-3 rounded-lg hover:bg-[#f9f7f5] text-red-600 transition-colors mt-2"
              onClick={async () => {
                try {
                  await authService.logout();
                  navigate("/login");
                } catch (error) {
                  console.error("Logout failed:", error);
                  // Logout anyway even if API fails
                  navigate("/login");
                }
              }}
            >
              <LogOut size={20} />
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-3 font-medium"
                >
                  Logout
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </motion.div>{" "}
      {/* Main Content */}
      <div
        className={`flex-1 w-full transition-all duration-300 ${contentWidth}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="flex justify-between items-center px-4 md:px-6 py-4">
            <div className="flex items-center">
              {isMobile && (
                <button
                  className="p-2 mr-3 rounded-md text-[#947054] hover:bg-[#f9f7f5]"
                  onClick={toggleSidebar}
                >
                  <Menu size={24} />
                </button>
              )}
              <h1 className="text-xl md:text-2xl font-bold text-[#333333] font-serif">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "properties" && "Properties Management"}
                {activeTab === "users" && "Users Management"}
                {activeTab === "settings" && "Settings"}
                {activeTab === "calendar" && "Calendar"}
                {activeTab === "help" && "Help & Support"}
              </h1>
            </div>
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-[#f9f7f5]">
                  <Bell size={20} className="text-[#947054]" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              {!isSidebarOpen && (
                <div className="hidden md:flex items-center space-x-2">
                  <img
                    src="https://i.pravatar.cc/150?img=2"
                    alt="Admin"
                    className="w-10 h-10 rounded-full border-2 border-[#947054]"
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-3 md:p-6 max-w-full overflow-hidden">
          <div className="animate-fadeIn">
            {activeTab === "overview" && <MainPanel />}
            {activeTab === "properties" && <Properties />}
            {activeTab === "users" && <Users />}
            {activeTab === "settings" && (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-[#e8e1d9]">
                <h2 className="text-xl font-semibold mb-4 text-[#947054]">
                  Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#e8e1d9] rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">
                      Account Settings
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Manage your account details and preferences
                    </p>
                    <button className="px-4 py-2 bg-[#947054] text-white rounded hover:bg-[#7d5e47] transition-colors">
                      Edit Profile
                    </button>
                  </div>
                  <div className="border border-[#e8e1d9] rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">
                      Notification Preferences
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Control when and how you receive notifications
                    </p>
                    <button className="px-4 py-2 bg-[#947054] text-white rounded hover:bg-[#7d5e47] transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "calendar" && (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-[#e8e1d9]">
                <h2 className="text-xl font-semibold mb-4 text-[#947054]">
                  Calendar
                </h2>
                <p className="text-gray-600">
                  Calendar view will be implemented here.
                </p>
              </div>
            )}
            {activeTab === "help" && (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border border-[#e8e1d9]">
                <h2 className="text-xl font-semibold mb-4 text-[#947054]">
                  Help & Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-[#e8e1d9] rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">Documentation</h3>
                    <p className="text-gray-600 mb-4">
                      Access user guides and tutorials
                    </p>
                    <button className="px-4 py-2 bg-[#947054] text-white rounded hover:bg-[#7d5e47] transition-colors">
                      View Docs
                    </button>
                  </div>
                  <div className="border border-[#e8e1d9] rounded-lg p-4">
                    <h3 className="text-lg font-medium mb-3">
                      Contact Support
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Get help from our support team
                    </p>
                    <button className="px-4 py-2 bg-[#947054] text-white rounded hover:bg-[#7d5e47] transition-colors">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
