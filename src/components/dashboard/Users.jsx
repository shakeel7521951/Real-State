import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Edit,
  UserPlus,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { userService } from "../../services/api";

// Sample data for fallback in case API fails
const sampleUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    role: "user",
    joined: "Jan 15, 2025",
    properties: 3,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "admin",
    joined: "Feb 22, 2025",
    properties: 0,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    email: "michael@example.com",
    role: "user",
    joined: "Mar 10, 2025",
    properties: 1,
    status: "inactive",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "user",
    joined: "Apr 5, 2025",
    properties: 2,
    status: "active",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
];

const UserModal = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(
    user || {
      id: "",
      name: "",
      email: "",
      role: "user",
      status: "active",
      joined: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      properties: 0,
      avatar: "https://i.pravatar.cc/150?img=1",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-md border border-[#e8e1d9] shadow-xl overflow-y-auto max-h-[90vh]"
          style={{ maxWidth: "calc(100vw - 2rem)" }}
        >
          <div className="flex justify-between items-center mb-4 sm:mb-6 border-b border-[#e8e1d9] pb-3 sm:pb-4">
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#947054]">
              {user ? "Edit User Profile" : "Add New User"}
            </h2>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-[#f9f7f5] text-gray-500 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="relative group">
                <img
                  src={formData.avatar}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-3 sm:border-4 border-[#e8e1d9] shadow-md group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute bottom-0 right-0 w-7 h-7 sm:w-8 sm:h-8 bg-[#947054] rounded-full flex items-center justify-center text-white shadow-md cursor-pointer hover:bg-[#7d5e47] transition-colors">
                  <Edit size={14} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947054] focus:border-transparent text-gray-700 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947054] focus:border-transparent text-gray-700 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947054] focus:border-transparent text-gray-700 bg-white text-sm"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947054] focus:border-transparent text-gray-700 bg-white text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="pt-3 sm:pt-4 flex justify-end gap-2 sm:gap-3 mt-5 sm:mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-3 sm:px-5 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg hover:bg-[#f9f7f5] transition-colors text-gray-700 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 sm:px-5 py-2 sm:py-2.5 bg-[#947054] text-white rounded-lg hover:bg-[#7d5e47] transition-colors font-medium flex items-center gap-1 sm:gap-2 text-sm"
              >
                <Check size={16} />
                {user ? "Update" : "Add User"}
              </button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await userService.getAllUsers();
        setUsers(response.data || []);
        setError("");
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to load users. Please try again later.");
        // Fallback to sample data if in development
        if (import.meta.env.DEV) {
          setUsers(sampleUsers);
        }
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Check if the screen is mobile on mount and on resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const filterContainer = document.getElementById("filter-container");
      if (
        filterContainer &&
        !filterContainer.contains(event.target) &&
        isFilterOpen
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterOpen]);

  const handleOpenModal = (user = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };
  const handleSaveUser = async (userData) => {
    if (userData.id) {
      // Update user role only (as per requirements)
      try {
        setLoading(true);
        // Only update the role as per requirements
        const response = await userService.updateUserRole(
          userData.id,
          userData.role
        );
        if (response.success) {
          // Update the local state
          setUsers(
            users.map((user) =>
              user.id === userData.id
                ? {
                    ...user,
                    role: userData.role,
                  }
                : user
            )
          );
          setError("");
        }
      } catch (err) {
        console.error("Failed to update user:", err);
        setError("Failed to update user. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      // In a real application, you would implement user creation
      // But as per requirements, we're just focusing on role updates for existing users
      console.log("User creation not implemented as per requirements");

      // For demo purposes only - remove in production
      if (import.meta.env.DEV) {
        const newUser = {
          ...userData,
          id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
        };
        setUsers([...users, newUser]);
      }
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter users by search term and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valueA = a[sortBy]?.toString().toLowerCase() || "";
    const valueB = b[sortBy]?.toString().toLowerCase() || "";

    if (sortOrder === "asc") {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });

  const renderSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-[#e8e1d9] p-3 xs:p-4 md:p-6 max-w-full overflow-hidden"
    >
      {/* Header section - Better responsive design */}
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 xs:gap-2 mb-5">
        <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#947054] flex items-center">
          <UserPlus size={20} className="mr-2 inline-block d-md-none" />
          Users Management
        </h2>
        <button
          onClick={() => handleOpenModal()}
          className="bg-[#947054] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-[#7d5e47] transition-all flex items-center gap-1 sm:gap-2 shadow-sm hover:shadow whitespace-nowrap text-sm sm:text-base w-full xs:w-auto justify-center"
        >
          <UserPlus size={16} />
          <span>Add New User</span>
        </button>
      </div>{" "}
      {/* Search and filter bar - Improved for mobile */}
      <div className="mb-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={
              isMobile ? "Search..." : "Search users by name or email..."
            }
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 border border-[#e8e1d9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#947054] focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div id="filter-container" className="relative z-20 w-full sm:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center justify-center sm:justify-between gap-2 px-3 py-2 sm:px-4 sm:py-2.5 border border-[#e8e1d9] rounded-lg hover:bg-[#f9f7f5] transition-colors w-full sm:w-auto"
          >
            {isMobile ? <Filter size={16} /> : <SlidersHorizontal size={16} />}
            <span className="mx-1">{isMobile ? "Filter" : "Filter Users"}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isFilterOpen && (
            <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-full sm:w-48 bg-white rounded-lg shadow-lg border border-[#e8e1d9] z-30">
              <div className="p-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Status</p>
                <div className="grid grid-cols-3 sm:grid-cols-1 gap-1">
                  <button
                    className={`text-center sm:text-left px-3 py-1.5 rounded-md text-sm ${
                      filterStatus === "all"
                        ? "bg-[#f0e6dd] text-[#947054]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setFilterStatus("all");
                      setIsFilterOpen(false);
                    }}
                  >
                    All
                  </button>
                  <button
                    className={`text-center sm:text-left px-3 py-1.5 rounded-md text-sm ${
                      filterStatus === "active"
                        ? "bg-[#f0e6dd] text-[#947054]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setFilterStatus("active");
                      setIsFilterOpen(false);
                    }}
                  >
                    Active
                  </button>
                  <button
                    className={`text-center sm:text-left px-3 py-1.5 rounded-md text-sm ${
                      filterStatus === "inactive"
                        ? "bg-[#f0e6dd] text-[#947054]"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setFilterStatus("inactive");
                      setIsFilterOpen(false);
                    }}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Responsive table wrapper */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        {/* Desktop View - Regular Table */}
        <div className="hidden md:block">
          <table className="min-w-full bg-white border border-[#e8e1d9] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#f9f7f5] text-gray-700 text-sm font-medium">
                <th
                  className="py-4 px-3 sm:px-6 text-left cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-1">
                    <span>Name</span> {renderSortIcon("name")}
                  </div>
                </th>
                <th
                  className="py-4 px-3 sm:px-6 text-left cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center gap-1">
                    <span>Email</span> {renderSortIcon("email")}
                  </div>
                </th>
                <th
                  className="py-4 px-3 sm:px-6 text-center cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("role")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Role</span> {renderSortIcon("role")}
                  </div>
                </th>
                <th
                  className="py-4 px-3 sm:px-6 text-center cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Status</span> {renderSortIcon("status")}
                  </div>
                </th>
                <th
                  className="py-4 px-3 sm:px-6 text-center cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("joined")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Joined</span> {renderSortIcon("joined")}
                  </div>
                </th>
                <th
                  className="py-4 px-3 sm:px-6 text-center cursor-pointer hover:bg-[#f0e6dd] transition-colors"
                  onClick={() => handleSort("properties")}
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Properties</span> {renderSortIcon("properties")}
                  </div>
                </th>
                <th className="py-4 px-3 sm:px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.length > 0 ? (
                sortedUsers.map((user) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-[#e8e1d9] hover:bg-[#f9f7f5] text-gray-700"
                  >
                    <td className="py-4 px-3 sm:px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <img
                            src={user.avatar}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#e8e1d9]"
                            alt={user.name}
                          />
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-left">
                      <span>{user.email}</span>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "agent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center">
                      <span>{user.joined}</span>
                    </td>
                    <td className="py-4 px-3 sm:px-6 text-center">
                      <span>{user.properties}</span>
                    </td>
                    <td className="py-4 px-3 sm:px-6">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                          title="Edit user"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                          title="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    {searchTerm
                      ? "No users match your search criteria"
                      : "No users found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Card Layout */}
        <div className="md:hidden px-4 space-y-4">
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-[#e8e1d9] rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={user.avatar}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#e8e1d9]"
                      alt={user.name}
                    />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-800">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                      title="Edit user"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div>
                    <span className="text-gray-500">Role:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "agent"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Joined:</span> {user.joined}
                  </div>
                  <div>
                    <span className="text-gray-500">Properties:</span>{" "}
                    {user.properties}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-8 text-center text-gray-500 bg-white border border-[#e8e1d9] rounded-lg">
              {searchTerm
                ? "No users match your search criteria"
                : "No users found"}
            </div>
          )}
        </div>
      </div>{" "}
      {/* User count and pagination placeholder - Improved responsiveness */}
      <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 px-4 sm:px-0">
        <div className="mb-3 sm:mb-0 text-center sm:text-left">
          Showing{" "}
          <span className="font-medium text-gray-700">
            {sortedUsers.length}
          </span>{" "}
          of <span className="font-medium text-gray-700">{users.length}</span>{" "}
          users
        </div>
        <div className="flex items-center">
          <button className="px-2 sm:px-3 py-1 border border-[#e8e1d9] rounded-l-md hover:bg-[#f9f7f5] text-xs sm:text-sm">
            Prev
          </button>
          <button className="px-2 sm:px-3 py-1 bg-[#947054] text-white border border-[#947054] text-xs sm:text-sm">
            1
          </button>
          <button className="hidden xs:block px-2 sm:px-3 py-1 border border-[#e8e1d9] hover:bg-[#f9f7f5] text-xs sm:text-sm">
            2
          </button>
          <button className="hidden xs:block px-2 sm:px-3 py-1 border border-[#e8e1d9] hover:bg-[#f9f7f5] text-xs sm:text-sm">
            3
          </button>
          <button className="px-2 sm:px-3 py-1 border border-[#e8e1d9] rounded-r-md hover:bg-[#f9f7f5] text-xs sm:text-sm">
            Next
          </button>
        </div>
      </div>
      <UserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleSaveUser}
      />
    </motion.div>
  );
};

export default Users;
