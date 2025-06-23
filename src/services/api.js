import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Include credentials in requests for cookies
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Property service
export const propertyService = {
  // Get all properties
  getAllProperties: async () => {
    try {
      const response = await api.get("/properties");
      // Handle both possible API response formats
      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        // If API returns { success: true, data: [...] } format
        return response.data;
      } else if (response.data && Array.isArray(response.data)) {
        // If API directly returns array
        return { data: response.data };
      } else {
        console.warn("Unexpected API response format:", response.data);
        return { data: [] };
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      return { data: [] }; // Return empty array instead of throwing
    }
  },

  // Get a single property by ID
  getPropertyById: async (id) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${id}:`, error);
      throw error;
    }
  },
  // Create a new property
  createProperty: async (propertyData) => {
    try {
      const response = await api.post("/properties", propertyData);
      // Handle both possible response formats
      if (response.data && response.data.data) {
        return response.data;
      } else if (response.data) {
        // If API directly returns the created property
        return { data: response.data, success: true };
      }
      return response.data;
    } catch (error) {
      console.error("Error creating property:", error);
      return { success: false, error: error.message };
    }
  },
  // Update an existing property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      // Handle both possible response formats
      if (response.data && response.data.data) {
        return response.data;
      } else if (response.data) {
        // If API directly returns the updated property
        return { data: response.data, success: true };
      }
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      return { success: false, error: error.message };
    }
  },

  // Delete a property
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      return { success: false, error: error.message };
    }
  },
  // Upload property images
  uploadPropertyImages: async (files) => {
    try {
      const formData = new FormData();

      // Append multiple files to the form data
      if (Array.isArray(files)) {
        files.forEach((file) => {
          formData.append("images", file);
        });
      } else {
        // If a single file is provided
        formData.append("images", files);
      }

      const response = await api.post("/upload/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error uploading images:", error);
      return { success: false, error: error.message };
    }
  },
};

// Authentication service
// User service
export const userService = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  // Get a single user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  },

  // Update user role
  updateUserRole: async (id, role) => {
    try {
      const response = await api.patch(`/users/${id}/role`, { role });
      return response.data;
    } catch (error) {
      console.error(`Error updating user role for ${id}:`, error);
      throw error;
    }
  },
};

export const authService = {
  // User registration
  register: async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },

  // User login
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },

  // User logout
  logout: async () => {
    try {
      const response = await api.get("/auth/logout");
      localStorage.removeItem("token");
      return response.data;
    } catch (error) {
      console.error("Error logging out:", error);
      // Remove token even if API call fails
      localStorage.removeItem("token");
      throw error;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  },

  // Verify email
  verifyEmail: async (token) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      return response.data;
    } catch (error) {
      console.error("Error verifying email:", error);
      throw error;
    }
  },

  // Resend verification email
  resendVerification: async (email) => {
    try {
      const response = await api.post("/auth/resend-verification", { email });
      return response.data;
    } catch (error) {
      console.error("Error resending verification:", error);
      throw error;
    }
  },

  // Forgot password
  forgotPassword: async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error;
    }
  },

  // Reset password
  resetPassword: async (token, password) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },
};

// Dashboard service
export const dashboardService = {
  // Get dashboard overview data
  getDashboardStats: async () => {
    try {
      const response = await api.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return {
        totalProperties: 0,
        totalUsers: 0,
        activeListings: 0,
        monthlyRevenue: "$0",
        statsChange: {
          properties: "0%",
          users: "0%",
          listings: "0%",
          revenue: "0%",
        },
      };
    }
  },

  // Get property sales and rentals data
  getPropertySalesRentals: async () => {
    try {
      const response = await api.get("/dashboard/property-trends");
      return response.data;
    } catch (error) {
      console.error("Error fetching property trends:", error);
      return { data: [] };
    }
  },

  // Get user activity data
  getUserActivity: async () => {
    try {
      const response = await api.get("/dashboard/user-activity");
      return response.data;
    } catch (error) {
      console.error("Error fetching user activity:", error);
      return { data: [] };
    }
  },

  // Get property distribution data
  getPropertyDistribution: async () => {
    try {
      const response = await api.get("/dashboard/property-distribution");
      return response.data;
    } catch (error) {
      console.error("Error fetching property distribution:", error);
      return { data: [] };
    }
  },

  // Get recent activity
  getRecentActivity: async () => {
    try {
      const response = await api.get("/dashboard/recent-activity");
      return response.data;
    } catch (error) {
      console.error("Error fetching recent activity:", error);
      return { data: [] };
    }
  },
};

export default api;
