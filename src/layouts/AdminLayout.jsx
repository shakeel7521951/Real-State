import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout max-w-[1536px] mx-auto">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
