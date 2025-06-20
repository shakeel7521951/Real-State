import React from 'react';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-[#f9f7f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#947054] flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-serif font-bold">RE</span>
          </div>
          <h1 className="text-3xl font-serif font-medium text-[#947054] mb-2">Prime Estates</h1>
          <p className="text-black/70">Create your professional account</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white border border-[#e8e1d9] rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-8">
            <h2 className="text-2xl font-medium text-black mb-6 text-center">Register Account</h2>
            
            <form className="space-y-5">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-[#947054]/80" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                    placeholder="John Smith"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
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
                    className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="h-5 w-5 text-[#947054]/80" />
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-[#947054]/80" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-2 text-xs text-black/50">
                  Minimum 8 characters with at least one number and one special character
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[#947054] focus:ring-[#947054] border-[#e8e1d9] rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="terms" className="text-sm text-black/80">
                    I agree to the <a href="#" className="text-[#947054] hover:text-[#836449]">Terms of Service</a> and <a href="#" className="text-[#947054] hover:text-[#836449]">Privacy Policy</a>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>

          {/* Login Link */}
          <div className="bg-[#f9f7f5] px-8 py-4 border-t border-[#e8e1d9]">
            <p className="text-sm text-black/80 text-center">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#947054] hover:text-[#836449]">
                Sign in
              </Link>
            </p>
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

export default SignUp;