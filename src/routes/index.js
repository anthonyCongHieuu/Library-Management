// File: src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import Login from '../components/Auth/Login';
import Dashboard from '../pages/Dashboard';
import UserManagement from '../pages/UserManagement';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Route công khai */}
      <Route path="/login" element={<Login />} />
      
      {/* Route được bảo vệ */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Route yêu cầu quy ền truy cập */}
      <Route element={<PrivateRoute requiredPermissions={['admin']} />}>
        <Route path="/user-management" element={<User Management />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;