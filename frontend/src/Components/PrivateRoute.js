import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = () => {
  const token = localStorage.getItem('token');

  return (
    token ? <Outlet /> : <Navigate to="/adminlogin" />
  )
}

export default Protected