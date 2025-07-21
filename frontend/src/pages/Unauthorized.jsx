import React from "react";
import { Link } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft } from "react-icons/fi";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-[#f9f7f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
          <FiAlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-serif font-medium text-black mb-4">
          Access Denied
        </h1>
        <p className="text-black/70 mb-8">
          You don't have permission to access this page. Please contact your
          administrator if you believe this is an error.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center py-3 px-6 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Link>

        <div className="mt-8">
          <p className="text-xs text-black/50">
            © {new Date().getFullYear()} Prime Estates. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
