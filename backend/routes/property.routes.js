import express from "express";
import {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
} from "../controllers/property.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getAllProperties);
router.get("/:id", getProperty);

// Protected routes
router.post("/", protect, createProperty);
router.put("/:id", protect, updateProperty);
router.delete("/:id", protect, deleteProperty);

export default router;
