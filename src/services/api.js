import axios from "axios";

// Create an axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://your-api-endpoint.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
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
      return response.data;
    } catch (error) {
      console.error("Error fetching properties:", error);
      throw error;
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
      return response.data;
    } catch (error) {
      console.error("Error creating property:", error);
      throw error;
    }
  },

  // Update an existing property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await api.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property ${id}:`, error);
      throw error;
    }
  },

  // Delete a property
  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property ${id}:`, error);
      throw error;
    }
  },

  // Upload property image
  uploadPropertyImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  },
};

export default api;
