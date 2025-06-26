import React from "react";
import { Link } from "react-router-dom";

const CommonHeader = ({
  title = "Contact Us",
  subtitle = "We're here to help with all your real estate needs",
}) => {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="../home/poster.webp"
          alt="Real Estate Header"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
          {title}
        </h1>
        <p className="text-xl text-white max-w-2xl mx-auto drop-shadow-md">
          {subtitle}
        </p>

        {/* Breadcrumb Navigation */}
        <div className="mt-5 left-0 right-0 flex justify-center">
          <nav className="text-sm text-white/90">
            <ol className="flex items-center space-x-2">
              <li className="hover:text-white transition-colors">
                <Link to="/">Home</Link>
              </li>
              <li>/</li>
              <li className="text-white font-medium">{title}</li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CommonHeader;
