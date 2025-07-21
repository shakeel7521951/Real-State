import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { propertyService, adminService } from "../services/api";
import CommonHeader from "../components/common/CommonHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [adminContact, setAdminContact] = useState(null);

  // Set page title dynamically based on property
  useDocumentTitle(property?.title || "Property Details");

  // Load admin contact details
  useEffect(() => {
    const loadAdminContact = async () => {
      try {
        const response = await adminService.getAdminContact();
        if (response.success) {
          setAdminContact(response.data);
        }
      } catch (error) {
        console.error("Error loading admin contact:", error);
        // Fallback to default contact
        setAdminContact({
          name: "Real Estate Admin",
          phone: "+1 (555) 123-4567",
          email: "admin@realestate.com",
          whatsapp: "+1555123456",
        });
      }
    };
    loadAdminContact();
  }, []);

  // Admin contact details - fallback if API fails
  const defaultAdminContact = {
    name: "Real Estate Admin",
    phone: "+1 (555) 123-4567",
    email: "admin@realestate.com",
    whatsapp: "+1555123456",
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching property with ID:", id); // Debug log
        const response = await propertyService.getPropertyById(id);
        console.log("Property API Response:", response); // Debug log

        if (response && response.data) {
          setProperty(response.data);
        } else {
          setError("Property not found");
        }
      } catch (err) {
        setError("Failed to load property details");
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleContactAdmin = () => {
    setShowContactModal(true);
  };

  const handleWhatsAppContact = () => {
    const contact = adminContact || defaultAdminContact;
    const message = `Hi! I'm interested in the property: ${property?.title} (${property?.location}). Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/${
      contact.whatsapp
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const nextImage = () => {
    if (property?.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images?.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div>
        <CommonHeader title="Property Details" />
        <div className="container mx-auto px-5 py-20">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#947054]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div>
        <CommonHeader title="Property Details" />
        <div className="container mx-auto px-5 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {error || "Property not found"}
            </h2>
            <button
              onClick={() => navigate("/properties")}
              className="bg-[#947054] text-white px-6 py-2 rounded hover:bg-[#7a5d47] transition duration-300"
            >
              Back to Properties
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <CommonHeader title="Property Details" />

      <div className="container mx-auto px-5 py-10">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <button
                onClick={() => navigate("/")}
                className="text-[#947054] hover:underline"
              >
                Home
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => navigate("/properties")}
                className="text-[#947054] hover:underline"
              >
                Properties
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 font-medium">{property.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Gallery */}
          <div className="lg:col-span-2">
            <div className="relative">
              {property.images && property.images.length > 0 ? (
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={property.images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-96 object-cover"
                  />

                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition"
                      >
                        →
                      </button>

                      {/* Image indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {property.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-3 h-3 rounded-full ${
                              index === currentImageIndex
                                ? "bg-white"
                                : "bg-white bg-opacity-50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">No images available</span>
                </div>
              )}

              {/* Thumbnail grid */}
              {property.images && property.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {property.images.slice(0, 4).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden ${
                        index === currentImageIndex
                          ? "ring-2 ring-[#947054]"
                          : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className="w-full h-20 object-cover hover:opacity-80 transition"
                      />
                      {index === 3 && property.images.length > 4 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold">
                          +{property.images.length - 4}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Property Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded ${
                    property.forSale
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {property.forSale ? "FOR SALE" : "FOR RENT"}
                </span>
                <span className="text-2xl font-bold text-[#947054]">
                  {property.price}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {property.title}
              </h1>

              <div className="flex items-center mb-4 text-gray-600">
                <img
                  src="/home/location.webp"
                  alt="location"
                  className="w-4 h-4 mr-2"
                />
                <span>{property.location}</span>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <img
                    src="/home/space.webp"
                    alt="space"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {property.space}
                  </span>
                </div>
                <div className="flex items-center">
                  <img
                    src="/home/bathtub.webp"
                    alt="bathroom"
                    className="w-5 h-5 mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {property.bathCount} Bath
                  </span>
                </div>
              </div>

              {/* Contact Admin Button */}
              <button
                onClick={handleContactAdmin}
                className="w-full bg-[#947054] text-white py-3 px-4 rounded-lg font-semibold hover:bg-[#7a5d47] transition duration-300 mb-3"
              >
                Contact Admin
              </button>

              {/* WhatsApp Quick Contact */}
              <button
                onClick={handleWhatsAppContact}
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
                WhatsApp Admin
              </button>

              {/* Owner Information */}
              {property.owner && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Listed by
                  </h3>
                  <p className="text-gray-600">{property.owner.name}</p>
                  <p className="text-sm text-gray-500">
                    {property.owner.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Property Description */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {property.description}
            </p>

            {/* Additional Details */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Property Details
                </h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium">
                      {property.forSale ? "For Sale" : "For Rent"}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Space:</span>
                    <span className="font-medium">{property.space}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium">{property.bathCount}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Listed Date:</span>
                    <span className="font-medium">
                      {new Date(property.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Location
                </h3>
                <p className="text-gray-700 mb-4">{property.location}</p>
                {/* You can add a map integration here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Contact Admin
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-2">
                  Get in touch with our admin for property inquiries:
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-16">Name:</span>
                  <span className="text-gray-600">
                    {(adminContact || defaultAdminContact).name}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-16">Phone:</span>
                  <a
                    href={`tel:${(adminContact || defaultAdminContact).phone}`}
                    className="text-[#947054] hover:underline"
                  >
                    {(adminContact || defaultAdminContact).phone}
                  </a>
                </div>

                <div className="flex items-center">
                  <span className="font-medium text-gray-700 w-16">Email:</span>
                  <a
                    href={`mailto:${
                      (adminContact || defaultAdminContact).email
                    }?subject=Inquiry about ${
                      property.title
                    }&body=Hi, I'm interested in the property: ${
                      property.title
                    } located at ${
                      property.location
                    }. Could you please provide more details?`}
                    className="text-[#947054] hover:underline"
                  >
                    {(adminContact || defaultAdminContact).email}
                  </a>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                >
                  WhatsApp
                </button>
                <a
                  href={`tel:${(adminContact || defaultAdminContact).phone}`}
                  className="flex-1 bg-[#947054] text-white py-2 px-4 rounded hover:bg-[#7a5d47] transition duration-300 text-center"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
