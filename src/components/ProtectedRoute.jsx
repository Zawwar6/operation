// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('loggedIn'); // simple auth check

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
