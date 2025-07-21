import React from "react";

const HomePoster = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      <img
        src="./home/poster.webp"
        alt="Luxury Home Poster"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#00000089] bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Find Your Dream Luxury Home Today
        </h1>
        <p className="text-lg md:text-xl max-w-2xl">
          Discover stunning properties in premium locations with world-class amenities. Let's make your dream home a reality.
        </p>
        <button className="mt-6 bg-[#947054] hover:bg-[#7a5d42] px-6 py-2 text-white rounded shadow-md transition duration-300">
          Explore Listings
        </button>
      </div>
    </div>
  );
};

export default HomePoster;
