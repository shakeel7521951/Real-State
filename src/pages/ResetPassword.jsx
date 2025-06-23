import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiLock, FiAlertCircle, FiCheckCircle, FiLoader } from "react-icons/fi";
import { authService } from "../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(
        err.message ||
          "Failed to reset password. The link may have expired or is invalid."
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
          <p className="text-black/70">Reset your password</p>
        </div>

        {/* Reset Password Card */}
        <div className="bg-white border border-[#e8e1d9] rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-medium text-black mb-6 text-center">
              Create New Password
            </h2>

            {/* Success State */}
            {success ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <div className="rounded-full bg-green-100 p-4">
                  <FiCheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-black text-center">
                  Password Reset Success!
                </h3>
                <p className="text-black/70 text-center">
                  Your password has been reset successfully. You will be
                  redirected to login shortly.
                </p>
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-[#947054]/80" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                        placeholder="••••••••"
                      />
                    </div>
                    <p className="mt-1 text-xs text-black/60">
                      Minimum 8 characters
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="h-5 w-5 text-[#947054]/80" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                        placeholder="••••••••"
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
                          Resetting Password...
                        </span>
                      ) : (
                        "Reset Password"
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

export default ResetPassword;
