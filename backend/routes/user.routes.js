import express from "express";
import {
  getAllUsers,
  getUser,
  updateUserRole,
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected and require admin privileges
router.use(protect, authorize("admin"));

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id/role", updateUserRole);

export default router;
