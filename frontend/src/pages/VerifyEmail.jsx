import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiCheckCircle, FiAlertCircle, FiLoader } from "react-icons/fi";
import { authService } from "../services/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmailToken = async () => {
      try {
        const response = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(
          response.message || "Your email has been successfully verified!"
        );
      } catch (error) {
        setStatus("error");
        setMessage(
          error.message ||
            "Verification failed. The link may have expired or is invalid."
        );
      }
    };

    if (token) {
      verifyEmailToken();
    } else {
      setStatus("error");
      setMessage("No verification token provided.");
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-[#f9f7f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#947054] flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-serif font-bold">RE</span>
          </div>
          <h1 className="text-3xl font-serif font-medium text-[#947054] mb-2">
            Prime Estates
          </h1>
          <p className="text-black/70">Email Verification</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white border border-[#e8e1d9] rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-8 text-center">
            {status === "loading" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <FiLoader className="h-12 w-12 text-[#947054] animate-spin" />
                <h2 className="text-lg font-medium text-black">
                  Verifying your email...
                </h2>
                <p className="text-black/70">
                  Please wait while we verify your email address.
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-green-100 p-4">
                  <FiCheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-2xl font-medium text-black">
                  Email Verified!
                </h2>
                <p className="text-black/70">{message}</p>
                <Link
                  to="/login"
                  className="mt-6 w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                >
                  Proceed to Login
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-red-100 p-4">
                  <FiAlertCircle className="h-12 w-12 text-red-600" />
                </div>
                <h2 className="text-2xl font-medium text-black">
                  Verification Failed
                </h2>
                <p className="text-black/70">{message}</p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                  <Link
                    to="/login"
                    className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                  >
                    Go to Login
                  </Link>
                  <Link
                    to="/resend-verification"
                    className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-[#947054] rounded-md text-sm font-medium text-[#947054] bg-transparent hover:bg-[#947054]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                  >
                    Resend Verification
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-black/50">
            © {new Date().getFullYear()} Prime Estates. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
