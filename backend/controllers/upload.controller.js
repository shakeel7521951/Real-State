import { cloudinary } from "../utils/cloudinary.js";

// @desc    Upload property images
// @route   POST /api/upload/properties
// @access  Private
export const uploadPropertyImages = async (req, res, next) => {
  try {
    // Check if any files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image",
      });
    }

    // Get URLs from the uploaded files
    const imageUrls = req.files.map((file) => file.path);

    // Return success response with image URLs
    res.status(200).json({
      success: true,
      count: imageUrls.length,
      data: imageUrls,
    });
  } catch (error) {
    // If there's an error with Cloudinary, we might need to delete any uploaded images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.path) {
          // Extract public_id from Cloudinary URL
          const publicId = file.filename;
          try {
            await cloudinary.uploader.destroy(publicId);
          } catch (deleteError) {
            console.error("Error deleting image from Cloudinary:", deleteError);
          }
        }
      }
    }

    console.error("Error uploading images:", error);
    next(error);
  }
};
