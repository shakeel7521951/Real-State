import "./App.css";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const Mainfunction = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Mainfunction />,
    children: [
      { path: "", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      {path:"/contact",element:<Contact />}
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
