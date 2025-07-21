import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { propertyService } from "../../services/api";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await propertyService.getAllProperties();
        console.log("Featured Properties API Response:", response); // Debug log

        if (response && response.data && Array.isArray(response.data)) {
          // Take only first 6 properties for featured section
          setProperties(response.data.slice(0, 6));
        } else {
          setError("Failed to load properties");
          // Fallback to static data for featured properties
          setProperties([
            {
              id: 1,
              image: "./home/feature1.webp",
              title: "Villa in Los Angeles",
              location: "Upper Road 3411, no.34 CA",
              price: "$435,343",
              description:
                "Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.",
              space: "120 sq ft",
              bathCount: "2",
              forSale: true,
              images: ["./home/feature1.webp"],
            },
            {
              id: 2,
              image: "./home/feature2.webp",
              title: "Modern Apartment",
              location: "Downtown Street 221, NY",
              price: "$310,000",
              description:
                "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
              space: "95 sq ft",
              bathCount: "1",
              forSale: true,
              images: ["./home/feature2.webp"],
            },
            {
              id: 3,
              image: "./home/feature3.webp",
              title: "Cozy Family House",
              location: "Sunset Blvd 101, TX",
              price: "$525,000",
              description:
                "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
              space: "140 sq ft",
              bathCount: "3",
              forSale: true,
              images: ["./home/feature3.webp"],
            },
          ]);
        }
      } catch (err) {
        setError("Failed to load properties from API");
        console.error("Error fetching featured properties:", err);
        // Fallback to static data
        setProperties([
          {
            id: 1,
            image: "./home/feature1.webp",
            title: "Villa in Los Angeles",
            location: "Upper Road 3411, no.34 CA",
            price: "$435,343",
            description:
              "Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.",
            space: "120 sq ft",
            bathCount: "2",
            forSale: true,
            images: ["./home/feature1.webp"],
          },
          {
            id: 2,
            image: "./home/feature2.webp",
            title: "Modern Apartment",
            location: "Downtown Street 221, NY",
            price: "$310,000",
            description:
              "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
            space: "95 sq ft",
            bathCount: "1",
            forSale: true,
            images: ["./home/feature2.webp"],
          },
          {
            id: 3,
            image: "./home/feature3.webp",
            title: "Cozy Family House",
            location: "Sunset Blvd 101, TX",
            price: "$525,000",
            description:
              "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
            space: "140 sq ft",
            bathCount: "3",
            forSale: true,
            images: ["./home/feature3.webp"],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="my-10">
        <h1 className="text-center text-2xl md:text-4xl font-semibold capitalize">
          FEATURED PROPERTIES
        </h1>
        <p className="text-xl text-center text-[#947054] italic">
          Suspendisse dictum enim sit amet libero malesuada feugiat.
        </p>
        <div className="container px-5 md:px-0 mx-auto mt-10">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#947054]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-10">
      <h1 className="text-center text-2xl md:text-4xl font-semibold capitalize">
        FEATURED PROPERTIES
      </h1>
      <p className="text-xl text-center text-[#947054] italic">
        Suspendisse dictum enim sit amet libero malesuada feugiat.
      </p>
      {error && (
        <p className="text-center text-red-500 text-sm mt-2">
          {error} - Showing sample properties
        </p>
      )}

      <div className="container px-5 md:px-0 mx-auto mt-10">
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

export default FeaturedProperties;
