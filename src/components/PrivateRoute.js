// File: src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Chuyển hướng đến trang đăng nhập nếu chưa xác thực
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;