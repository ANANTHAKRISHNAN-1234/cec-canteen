import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Anonymous2 = () => {
  const token = localStorage.getItem("admintoken");

  return !token ? <Outlet /> : <Navigate to="/admin-dashboard" />;
};

export default Anonymous2;
