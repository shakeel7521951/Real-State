import express from "express";
import { protect } from "../middleware/auth.js";
import * as dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

// All dashboard routes should be protected
router.use(protect);

// Get dashboard stats
router.get("/stats", dashboardController.getDashboardStats);

// Get property sales and rentals data
router.get("/property-trends", dashboardController.getPropertyTrends);

// Get user activity data
router.get("/user-activity", dashboardController.getUserActivity);

// Get property distribution data
router.get(
  "/property-distribution",
  dashboardController.getPropertyDistribution
);

// Get recent activity data
router.get("/recent-activity", dashboardController.getRecentActivity);

export default router;
