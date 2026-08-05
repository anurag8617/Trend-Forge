import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  // 1. Look specifically for the admin token, not the client token
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // 2. Redirect to the admin login page, NOT the client login
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}