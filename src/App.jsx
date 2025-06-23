import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import SignUp from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ResendVerification from "./pages/ResendVerification";
import Unauthorized from "./pages/Unauthorized";

import Dashboard from "./components/dashboard/Dashboard";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/properties", element: <Properties /> },
      { path: "/contact", element: <Contact /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/verify-email/:token", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },
      { path: "/reset-password/:token", element: <ResetPassword /> },
      { path: "/resend-verification", element: <ResendVerification /> },
      { path: "/unauthorized", element: <Unauthorized /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: (
          <MainLayout>
            <Dashboard />
          </MainLayout>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute requiredRole="admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
