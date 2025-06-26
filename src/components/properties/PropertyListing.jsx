import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertyService } from "../../services/api";

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await propertyService.getAllProperties();
        console.log("API Response:", response); // Debug log

        if (response && response.data && Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          setError("Invalid response format from server");
          setProperties([]);
        }
      } catch (err) {
        setError("Failed to load properties from server");
        console.error("Error fetching properties:", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold p-7">
          Property Listing
        </h1>
        <div className="container px-5 md:px-0 mx-auto my-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#947054]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold p-7">
          Property Listing
        </h1>
        <div className="container px-5 md:px-0 mx-auto my-10">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-semibold">{error}</p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#947054] text-white px-6 py-2 rounded hover:bg-[#7a5d47] transition duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (properties.length === 0 && !loading) {
    return (
      <div>
        <h1 className="text-3xl md:text-5xl font-semibold p-7">
          Property Listing
        </h1>
        <div className="container px-5 md:px-0 mx-auto my-10">
          <div className="text-center">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-gray-600 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="font-semibold">No Properties Found</p>
                <p className="text-sm">
                  There are currently no properties available.
                </p>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="bg-[#947054] text-white px-6 py-2 rounded hover:bg-[#7a5d47] transition duration-300"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl md:text-5xl font-semibold p-7">
        Property Listing
      </h1>
      <div className="container px-5 md:px-0 mx-auto my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {properties.map((property) => (
            <Link
              to={`/property/${property.id}`}
              key={property.id}
              className="rounded-lg shadow-md group block hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    property.images?.[0] ||
                    property.image ||
                    "./home/feature1.webp"
                  }
                  alt={property.title}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />

                <button className="absolute top-3 left-3 bg-[#947054] text-white group-hover:bg-white group-hover:text-[#947054] transition duration-500 p-2 text-sm rounded">
                  {property.forSale ? "FOR SALE" : "FOR RENT"}
                </button>

                <div className="absolute bottom-3 right-3 bg-white font-bold text-[#947054] p-2 text-sm rounded transition duration-500 group-hover:bg-[#947054] group-hover:text-white">
                  {property.price}
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <div className="py-1 flex text-center gap-3">
                  <img
                    src="./home/location.webp"
                    alt="location icon"
                    loading="lazy"
                  />
                  <p className="text-[#947054] font-semibold">
                    {property.location}
                  </p>
                </div>
                <p className="text-sm py-2">{property.description}</p>
                <div className="flex gap-5 items-end justify-between">
                  <div className="flex items-end gap-7">
                    <img src="./home/new.webp" alt="new icon" loading="lazy" />
                    <img
                      src="./home/bathtub.webp"
                      alt="bathtub icon"
                      className="h-4"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p className="text-[#947054]">{property.bathCount}</p>
                  </div>
                  <div className="flex items-end gap-7">
                    <img
                      src="./home/space.webp"
                      alt="space icon"
                      loading="lazy"
                    />
                    <p className="text-[#947054]">{property.space}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
