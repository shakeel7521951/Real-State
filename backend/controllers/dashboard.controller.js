import Property from "../models/Property.js";
import User from "../models/User.js";

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Count total properties
    const totalProperties = await Property.countDocuments();

    // Count total users
    const totalUsers = await User.countDocuments();

    // Count active listings (properties with status = "active")
    const activeListings = await Property.countDocuments({ status: "active" });

    // Calculate monthly revenue (for demo purposes - this would be more complex in a real application)
    // In a real app, you would likely sum up transactions from a transactions collection
    const monthlyRevenue = Math.floor(Math.random() * 50000) + 10000;

    // Generate random changes (in a real app these would be calculated by comparing with previous period)
    const propertiesChange = (Math.random() * 10 + 1).toFixed(1);
    const usersChange = (Math.random() * 8 + 1).toFixed(1);
    const listingsChange = (Math.random() * 5 + 1).toFixed(1);
    const revenueChange = (Math.random() * 12 + 1).toFixed(1);

    res.json({
      totalProperties,
      totalUsers,
      activeListings,
      monthlyRevenue: `$${monthlyRevenue.toLocaleString()}`,
      statsChange: {
        properties: `+${propertiesChange}%`,
        users: `+${usersChange}%`,
        listings: `+${listingsChange}%`,
        revenue: `+${revenueChange}%`,
      },
    });
  } catch (error) {
    console.error("Error getting dashboard stats:", error);
    res.status(500).json({ message: "Error fetching dashboard stats" });
  }
};

// Get property sales and rentals data
export const getPropertyTrends = async (req, res) => {
  try {
    // In a real app, you would query your database for this data
    // For now, we'll return mock data similar to what's in the frontend
    const propertyTrends = [
      {
        month: "Jan",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
      {
        month: "Feb",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
      {
        month: "Mar",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
      {
        month: "Apr",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
      {
        month: "May",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
      {
        month: "Jun",
        sales: Math.floor(Math.random() * 20),
        rentals: Math.floor(Math.random() * 30),
      },
    ];

    res.json({ data: propertyTrends });
  } catch (error) {
    console.error("Error getting property trends:", error);
    res.status(500).json({ message: "Error fetching property trends" });
  }
};

// Get user activity data
export const getUserActivity = async (req, res) => {
  try {
    // In a real app, you would query your database for this data
    const userActivity = [
      { name: "Monday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Tuesday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Wednesday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Thursday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Friday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Saturday", visits: Math.floor(Math.random() * 60) + 10 },
      { name: "Sunday", visits: Math.floor(Math.random() * 60) + 10 },
    ];

    res.json({ data: userActivity });
  } catch (error) {
    console.error("Error getting user activity:", error);
    res.status(500).json({ message: "Error fetching user activity" });
  }
};

// Get property distribution data
export const getPropertyDistribution = async (req, res) => {
  try {
    // In a real app, you would aggregate your properties by type
    // For now, we return mock data
    const propertyDistribution = [
      { name: "Apartments", value: Math.floor(Math.random() * 50) + 20 },
      { name: "Houses", value: Math.floor(Math.random() * 40) + 20 },
      { name: "Villas", value: Math.floor(Math.random() * 20) + 5 },
      { name: "Commercial", value: Math.floor(Math.random() * 15) + 5 },
    ];

    res.json({ data: propertyDistribution });
  } catch (error) {
    console.error("Error getting property distribution:", error);
    res.status(500).json({ message: "Error fetching property distribution" });
  }
};

// Get recent activity data
export const getRecentActivity = async (req, res) => {
  try {
    // In a real app, you would query recent events from your database
    // For now, we return mock data
    const activities = [
      {
        type: "property_listed",
        icon: "🏠",
        title: "New Property Listed",
        description: "Villa in Beverly Hills - $1,250,000",
        time: "2 hours ago",
        color: "#947054",
      },
      {
        type: "property_sold",
        icon: "💰",
        title: "Property Sold",
        description: "Apartment in Downtown - $450,000",
        time: "5 hours ago",
        color: "#C4A484",
      },
      {
        type: "user_registered",
        icon: "👤",
        title: "New User Registered",
        description: "Sarah Williams joined the platform",
        time: "Yesterday",
        color: "#DEC19B",
      },
      {
        type: "new_review",
        icon: "⭐",
        title: "New Review",
        description: "5-star review for Seaside Villa",
        time: "2 days ago",
        color: "#E8E1D9",
      },
    ];

    res.json({ data: activities });
  } catch (error) {
    console.error("Error getting recent activity:", error);
    res.status(500).json({ message: "Error fetching recent activity" });
  }
};
