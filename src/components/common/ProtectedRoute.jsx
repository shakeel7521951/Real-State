import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../../services/api";

const ProtectedRoute = ({ requiredRole = "user" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const user = await authService.getCurrentUser();
          setIsAuthenticated(true);
          setCurrentUser(user.data);
          console.log("Current User:", user.data);
        } else {
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role (if specified)
  if (requiredRole === "admin" && currentUser?.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check if user has verified their email
  if (!currentUser?.isVerified) {
    return <Navigate to="/resend-verification" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
