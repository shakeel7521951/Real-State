import React, { useState } from "react";
import {
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
  FiLoader,
  FiArrowLeft,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { authService } from "../services/api";

const ResendVerification = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.resendVerification(email);
      setSuccess(
        response.message ||
          "Verification email has been sent. Please check your inbox."
      );
    } catch (err) {
      setError(
        err.message || "Failed to resend verification email. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-black/70">Resend Verification Email</p>
        </div>

        {/* Resend Verification Card */}
        <div className="bg-white border border-[#e8e1d9] rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-medium text-black mb-6 text-center">
              Resend Verification
            </h2>

            {/* Success State */}
            {success ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <div className="rounded-full bg-green-100 p-4">
                  <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-black text-center">
                  Email Sent
                </h3>
                <p className="text-black/70 text-center">{success}</p>
                <Link
                  to="/login"
                  className="mt-4 inline-flex items-center text-[#947054] hover:text-[#836449]"
                >
                  <FiArrowLeft className="mr-2" /> Back to login
                </Link>
              </div>
            ) : (
              <>
                {/* Alert Message */}
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center">
                    <FiAlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}

                <p className="text-black/70 mb-6">
                  Enter your email address and we'll send you another
                  verification email.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="h-5 w-5 text-[#947054]/80" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <FiLoader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Sending Verification...
                        </span>
                      ) : (
                        "Resend Verification Email"
                      )}
                    </button>
                  </div>

                  <div className="text-center">
                    <Link
                      to="/login"
                      className="text-sm font-medium text-[#947054] hover:text-[#836449]"
                    >
                      Back to login
                    </Link>
                  </div>
                </form>
              </>
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

export default ResendVerification;
