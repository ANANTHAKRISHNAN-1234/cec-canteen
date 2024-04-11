import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected2 = () => {
  const token = localStorage.getItem("admintoken");

  return token ? <Outlet /> : <Navigate to="/adminlogin" />;
};

export default Protected2;
