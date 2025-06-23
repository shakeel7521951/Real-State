import express from "express";
import { upload } from "../utils/cloudinary.js";
import { protect } from "../middleware/auth.js";
import { uploadPropertyImages } from "../controllers/upload.controller.js";

const router = express.Router();

// Route for uploading property images
router.post(
  "/properties",
  protect,
  upload.array("images", 5),
  uploadPropertyImages
);

export default router;
