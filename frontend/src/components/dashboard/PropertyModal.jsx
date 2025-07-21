import React, { useState, useEffect, useMemo } from "react";
import { propertyService } from "../../services/api"; // Import API service

const PropertyModal = ({ isOpen, onClose, property, onSave }) => {
  const initialFormState = useMemo(
    () => ({
      id: "",
      title: "",
      location: "",
      price: "",
      description: "",
      space: "",
      bathCount: "",
      forSale: true,
      images: [],
    }),
    []
  );

  const [formData, setFormData] = useState(initialFormState);
  const [imagesPreviews, setImagesPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    if (property) {
      setFormData({
        id: property.id || "",
        title: property.title || "",
        location: property.location || "",
        price: property.price || "",
        description: property.description || "",
        space: property.space || "",
        bathCount: property.bathCount || "",
        forSale: property.forSale !== undefined ? property.forSale : true,
        images: property.images || property.image ? [property.image] : [],
      });
      setImagesPreviews(
        property.images || (property.image ? [property.image] : [])
      );
    } else {
      setFormData(initialFormState);
      setImagesPreviews([]);
    }
  }, [property, initialFormState]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newImagePreviews = [];

      // Create local preview URLs for the UI
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImagePreviews.push(reader.result);

          // Update state once all files are processed for preview
          if (newImagePreviews.length === files.length) {
            setImagesPreviews([...imagesPreviews, ...newImagePreviews]);

            // Store file objects for uploading later when form is submitted
            // We'll store the actual files instead of the base64 strings
            setFormData({
              ...formData,
              _files: [...(formData._files || []), ...files],
              // Keep the existing images array (these are URLs that are already uploaded)
              images: formData.images || [],
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    const updatedPreviews = [...imagesPreviews];
    const updatedImages = [...formData.images];

    // If we're removing a preview of a new file (not yet uploaded)
    if (index >= formData.images.length && formData._files) {
      const fileIndex = index - formData.images.length;
      const updatedFiles = [...formData._files];
      updatedFiles.splice(fileIndex, 1);
      setFormData({
        ...formData,
        _files: updatedFiles,
        images: updatedImages,
      });
    } else {
      // We're removing an already uploaded image
      updatedImages.splice(index, 1);
      setFormData({
        ...formData,
        images: updatedImages,
      });
    }

    updatedPreviews.splice(index, 1);
    setImagesPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);
      setUploadError("");

      // Only upload new files if there are any
      let allImageUrls = [...formData.images]; // Start with existing images

      if (formData._files && formData._files.length > 0) {
        // Upload new images to Cloudinary
        const uploadResponse = await propertyService.uploadPropertyImages(
          formData._files
        );

        if (uploadResponse.success && uploadResponse.data) {
          // Add the new image URLs to our existing ones
          allImageUrls = [...allImageUrls, ...uploadResponse.data];
        } else {
          throw new Error(uploadResponse.error || "Failed to upload images");
        }
      }

      // Create the final property data with all image URLs
      const finalPropertyData = {
        ...formData,
        images: allImageUrls,
      };

      // Remove the _files property as it's no longer needed
      delete finalPropertyData._files;

      // Save the property with all image URLs included
      onSave(finalPropertyData);
      onClose();
    } catch (error) {
      setUploadError(error.message || "Failed to upload images");
      console.error("Error during image upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide shadow-2xl">
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#947054] to-[#a88b74] py-4 px-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <svg
                className="w-7 h-7 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              {property ? "Edit Property" : "Add New Property"}
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 focus:outline-none bg-white/20 p-2 rounded-full transition-all duration-200 hover:bg-white/30"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                {" "}
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  Property Images
                </label>
                <div className="flex flex-col space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-[#947054] transition-colors duration-200">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                      id="property-images"
                    />
                    <label
                      htmlFor="property-images"
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <svg
                        className="w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                      <span className="mt-2 text-base text-gray-600">
                        Click to upload multiple images
                      </span>
                      <span className="text-sm text-gray-500">
                        JPG, PNG, WEBP up to 5MB each
                      </span>
                    </label>
                  </div>

                  {imagesPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {imagesPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`Property preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>{" "}
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200"
                  required
                  placeholder="e.g. Luxury Villa with Pool"
                />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200"
                  required
                  placeholder="e.g. Downtown Street 221, NY"
                />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg py-2.5 pl-7 pr-3 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200"
                    required
                    placeholder="e.g. 435,000"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    ></path>
                  </svg>
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200 h-28 resize-none"
                  required
                  placeholder="Describe the property features and highlights..."
                />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    ></path>
                  </svg>
                  Space (sq ft)
                </label>
                <input
                  type="text"
                  name="space"
                  value={formData.space}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200"
                  required
                  placeholder="e.g. 120"
                />
              </div>
              <div>
                <label className="flex items-center text-gray-700 font-medium mb-2">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  Bathroom Count
                </label>
                <input
                  type="text"
                  name="bathCount"
                  value={formData.bathCount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-[#947054]/30 focus:border-[#947054] outline-none transition-all duration-200"
                  required
                  placeholder="e.g. 2"
                />
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="forSale"
                    checked={formData.forSale}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#947054]/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#947054]"></div>
                  <span className="ml-3 text-gray-700 font-medium">
                    {formData.forSale ? "For Sale" : "For Rent"}
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none transition duration-200 ease-in-out"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-[#947054] to-[#a88b74] hover:from-[#7d5e48] hover:to-[#8a7462] text-white font-medium rounded-md focus:outline-none transition duration-200 ease-in-out shadow-md hover:shadow-lg flex items-center"
              >
                {isUploading ? (
                  <svg
                    className="w-5 h-5 mr-2 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v8l4 4m0 0l4-4m-4 4V4"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    ></path>
                  </svg>
                )}
                {property ? "Update Property" : "Add Property"}
              </button>
            </div>

            {uploadError && (
              <div className="mt-4 text-red-500 text-sm">{uploadError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
