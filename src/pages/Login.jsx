import React from 'react';
import { FiLock, FiMail } from 'react-icons/fi';

const Login = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#947054] flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-serif font-bold">RE</span>
          </div>
          <h1 className="text-3xl font-serif font-medium text-[#947054] mb-2">Prime Estates</h1>
          <p className="text-black/70">Professional real estate services</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-[#e8e1d9] rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-medium text-black mb-6 text-center">Sign In</h2>
            
            <form className="space-y-5">
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
                    autoComplete="current-password"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-[#e8e1d9] rounded-md focus:ring-1 focus:ring-[#947054] focus:border-[#947054] placeholder-gray-400 text-black"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#947054] focus:ring-[#947054] border-[#e8e1d9] rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-black/80">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-[#947054] hover:text-[#836449]">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-[#947054] hover:bg-[#836449] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#947054] transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>

          <div className="bg-[#f9f7f5] px-8 py-4 border-t border-[#e8e1d9]">
            <p className="text-sm text-black/80 text-center">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-[#947054] hover:text-[#836449]">
                Request access
              </a>
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

export default Login;