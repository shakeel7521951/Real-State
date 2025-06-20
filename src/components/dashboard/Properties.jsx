import React, { useState } from "react";
import { propertyService } from "../../services/api";
import PropertyModal from "./PropertyModal";

// Sample data for development (will be replaced with API calls)
const sampleProperties = [
  {
    id: 1,
    images: [
      "/home/feature1.webp",
      "/home/feature4.webp",
      "/home/feature6.webp",
    ],
    title: "Villa in Los Angeles",
    location: "Upper Road 3411, no.34 CA",
    price: "$435,343",
    description:
      "Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.",
    space: "120 sq ft",
    bathCount: "2",
    forSale: true,
  },
  {
    id: 2,
    images: ["/home/feature2.webp"],
    title: "Modern Apartment",
    location: "Downtown Street 221, NY",
    price: "$310,000",
    description:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    space: "95 sq ft",
    bathCount: "1",
    forSale: true,
  },
  {
    id: 3,
    images: ["/home/feature3.webp", "/home/feature5.webp"],
    title: "Cozy Family House",
    location: "Sunset Blvd 101, TX",
    price: "$525,000",
    description:
      "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
    space: "140 sq ft",
    bathCount: "3",
    forSale: false,
  },
];

const DashboardProperties = () => {
  const [properties, setProperties] = useState(sampleProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // For real API implementation, uncomment this
  // useEffect(() => {
  //   fetchProperties();
  // }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const data = await propertyService.getAllProperties();
      setProperties(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
      setIsLoading(false);
    }
  };

  const handleAddProperty = () => {
    setCurrentProperty(null);
    setIsModalOpen(true);
  };

  const handleEditProperty = (property) => {
    setCurrentProperty(property);
    setIsModalOpen(true);
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        // For real implementation:
        // await propertyService.deleteProperty(id);

        // For demo:
        setProperties(properties.filter((property) => property.id !== id));
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  const handleSaveProperty = async (propertyData) => {
    try {
      if (propertyData.id) {
        // Edit existing property
        // For real implementation:
        // await propertyService.updateProperty(propertyData.id, propertyData);

        // For demo:
        setProperties(
          properties.map((prop) =>
            prop.id === propertyData.id ? propertyData : prop
          )
        );
      } else {
        // Add new property
        // For real implementation:
        // const savedProperty = await propertyService.createProperty(propertyData);

        // For demo:
        const newProperty = {
          ...propertyData,
          id: Math.max(...properties.map((p) => p.id), 0) + 1,
        };
        setProperties([...properties, newProperty]);
      }
    } catch (error) {
      console.error("Failed to save property:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-[#947054] flex items-center">
              <svg
                className="w-8 h-8 mr-3 text-[#947054]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                ></path>
              </svg>
              Property Management
            </h1>
            <p className="text-gray-600 mt-1 ml-11">
              Manage your real estate listings efficiently
            </p>
          </div>
          <button
            onClick={handleAddProperty}
            className="bg-gradient-to-r from-[#947054] to-[#a88b74] hover:from-[#7d5e48] hover:to-[#8a7462] text-white font-medium py-2.5 px-5 rounded-lg flex items-center shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Add New Property
          </button>
        </div>
        <div className="mt-6 h-1 bg-gradient-to-r from-[#947054] to-transparent rounded"></div>
      </div>

      {isLoading ? (
        <div className="text-center py-10">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#947054]"></div>
          <p className="mt-3 text-[#947054]">Loading properties...</p>
        </div>
      ) : properties.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            ></path>
          </svg>
          <p className="mt-4 text-gray-700 text-lg">No properties found</p>
          <p className="text-gray-500">
            Click "Add New Property" to create one
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md group overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-60">
                {property.images && property.images.length > 0 ? (
                  <div className="relative w-full h-full">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {property.images.length > 1 && (
                      <div className="absolute bottom-3 left-3 flex space-x-1">
                        {property.images.slice(0, 3).map((img, idx) => (
                          <div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === 0 ? "bg-white" : "bg-white/60"
                            }`}
                          />
                        ))}
                        {property.images.length > 3 && (
                          <span className="text-xs bg-white/80 text-gray-800 rounded-full px-2">
                            +{property.images.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                )}

                <button
                  className={`absolute top-3 right-3 ${
                    property.forSale ? "bg-[#947054]" : "bg-blue-600"
                  } text-white group-hover:bg-white group-hover:text-[#947054] transition duration-500 px-3 py-1 text-sm rounded-full shadow-lg`}
                >
                  {property.forSale ? "FOR SALE" : "FOR RENT"}
                </button>

                <button className="absolute bottom-3 right-3 bg-white font-bold text-[#947054] px-3 py-1 text-sm rounded-full transition duration-500 group-hover:bg-[#947054] group-hover:text-white shadow-lg">
                  {property.price}
                </button>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <div className="py-1 flex text-center gap-3">
                  <img
                    src="/home/location.webp"
                    alt="location icon"
                    loading="lazy"
                    className="h-5"
                  />
                  <p className="text-[#947054] font-semibold">
                    {property.location}
                  </p>
                </div>
                <p className="text-sm py-2 line-clamp-2">
                  {property.description}
                </p>
                <div className="flex gap-5 items-end justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="/home/bathtub.webp"
                      alt="bathtub icon"
                      className="h-4"
                      loading="lazy"
                    />
                    <p className="text-[#947054]">{property.bathCount}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="/home/space.webp"
                      alt="space icon"
                      loading="lazy"
                      className="h-4"
                    />
                    <p className="text-[#947054]">{property.space}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEditProperty(property)}
                    className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                  >
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
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProperty(property.id)}
                    className="text-red-600 hover:text-red-800 font-medium flex items-center"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <PropertyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        property={currentProperty}
        onSave={handleSaveProperty}
      />
    </div>
  );
};

export default DashboardProperties;
