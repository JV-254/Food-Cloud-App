// Client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('foodcloud_token');

  // If there's no active session token, boot them back to the login gateway
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}