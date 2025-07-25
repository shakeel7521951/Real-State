import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.jpg";
import { authService } from "../../services/api";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await authService.getCurrentUser();
        setIsLoggedIn(true);
        setUserRole(user.data.role);
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };
  const handleLogout = async () => {
    try {
      await authService.logout();
      setIsLoggedIn(false);
      setUserRole(null);
      navigate("/");
      setMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">
            <img
              src={logo}
              alt="company logo"
              className="w-20 h-10"
              loading="lazy"
            />
          </Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {["Home", "About", "Properties", "Contact"].map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="relative text-gray-700 hover:text-[#947054] font-medium transition duration-300 group"
            >
              {item}
              <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-[#947054] transition-all duration-300 group-hover:left-0 group-hover:w-full transform -translate-x-1/2 group-hover:translate-x-0"></span>
            </Link>
          ))}
        </div>{" "}
        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {userRole === "admin" && (
                <Link to="/admin/dashboard">
                  <button className="text-gray-700 hover:text-[#947054] font-medium transition">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-[#947054] text-white px-4 py-2 rounded-md hover:bg-[#7a5c43] transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-gray-700 hover:text-[#947054] font-medium transition">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-[#947054] text-white px-4 py-2 rounded-md hover:bg-[#7a5c43] transition shadow-sm">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(true)}
            className="text-gray-700 hover:text-[#947054] transition"
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu - Slides from right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-500 hover:text-[#947054] transition"
            aria-label="Close menu"
          >
            <X size={26} />
          </button>
        </div>
        <div className="flex flex-col p-4 gap-4">
          {["Home", "About", "Properties", "Contact"].map((item, idx) => (
            <Link
              key={idx}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 text-lg font-medium hover:text-[#947054] transition py-2 px-3 rounded hover:bg-gray-50"
            >
              {item}
            </Link>
          ))}{" "}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
            {isLoggedIn ? (
              <>
                {userRole === "admin" && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>
                    <button className="w-full text-left text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50 transition border border-gray-300">
                      Dashboard
                    </button>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-[#947054] text-white font-medium py-2 px-4 rounded hover:bg-[#7a5c43] transition shadow-sm w-full text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full text-left text-gray-700 font-medium py-2 px-4 rounded hover:bg-gray-50 transition border border-gray-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="bg-[#947054] text-white font-medium py-2 px-4 rounded hover:bg-[#7a5c43] transition shadow-sm w-full text-center">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Background overlay when menu is open */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
        />
      )}
    </nav>
  );
};

export default Navbar;
