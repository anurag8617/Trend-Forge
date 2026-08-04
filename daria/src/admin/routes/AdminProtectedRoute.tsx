import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function AdminProtectedRoute() {
  const token = localStorage.getItem('token');
  
  // In a real implementation, we would decode the JWT to check for the 'admin' role
  // or verify with a secure backend endpoint.
  // For this infrastructure setup, we check if the token exists.
  // We can add more stringent checks here later without modifying buyer routes.
  
  if (!token) {
    // Redirect to the main login (or a specific admin login if one existed)
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}
