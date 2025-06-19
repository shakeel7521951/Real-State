const propertiesData = [
  {
    id: 1,
    image: "./home/feature1.webp",
    title: "Villa in Los Angeles",
    location: "Upper Road 3411, no.34 CA",
    price: "$435,343",
    description:
      "Integer nec bibendum lacus. Suspendisse dictum enim sit amet libero malesuada.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "120 sq ft",
    bathCount: "2",
  },
  {
    id: 2,
    image: "./home/feature2.webp",
    title: "Modern Apartment",
    location: "Downtown Street 221, NY",
    price: "$310,000",
    description:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "95 sq ft",
    bathCount: "1",
  },
  {
    id: 3,
    image: "./home/feature3.webp",
    title: "Cozy Family House",
    location: "Sunset Blvd 101, TX",
    price: "$525,000",
    description:
      "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "140 sq ft",
    bathCount: "3",
  },
  {
    id: 4,
    image: "./home/feature4.webp",
    title: "Villa in Los Angeles",
    location: "Upper Road 3411, no.34 CA",
    price: "$525,000",
    description:
      "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "140 sq ft",
    bathCount: "3",
  },
  {
    id: 4,
    image: "./home/feature5.webp",
    title: "Town House in Los Angeles",
    location: "Upper Road 3411, no.34 CA",
    price: "$525,000",
    description:
      "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "140 sq ft",
    bathCount: "3",
  },
  {
    id: 4,
    image: "./home/feature6.webp",
    title: "Town House in Los Angeles",
    location: "Upper Road 3411, no.34 CAs",
    price: "$525,000",
    description:
      "Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.",
    newIcon: "./home/new.webp",
    bathtubIcon: "./home/bathtub.webp",
    spaceIcon: "./home/space.webp",
    space: "140 sq ft",
    bathCount: "3",
  },
];

const FeaturedProperties = () => {
  return (
    <div className="my-10">
      <h1 className="text-center text-2xl md:text-4xl font-semibold capitalize">
        FEATURED PROPERTIES
      </h1>
      <p className="text-xl text-center text-[#947054] italic">
        Suspendisse dictum enim sit amet libero malesuada feugiat.
      </p>

      <div className="container px-5 md:px-0 mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {propertiesData.map((property) => (
            <div
              key={property.id}
              className="rounded-lg shadow-md group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />

                <button className="absolute top-3 left-3 bg-[#947054] text-white group-hover:bg-white group-hover:text-[#947054] transition duration-500 p-2 text-sm rounded">
                  FOR SALE
                </button>

                <button className="absolute bottom-3 right-3 bg-white font-bold text-[#947054] p-2 text-sm rounded transition duration-500 group-hover:bg-[#947054] group-hover:text-white">
                  {property.price}
                </button>
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
                    <img src={property.newIcon} alt="new icon" loading="lazy" />
                    <img
                      src={property.bathtubIcon}
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
                      src={property.spaceIcon}
                      alt="space icon"
                      loading="lazy"
                    />
                    <p className="text-[#947054]">{property.space}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
