// src/utils/roles.js
export const ROLES = {
    ADMIN: 'admin',
    LIBRARIAN: 'librarian',
    USER: 'user'
  };
  
  export const checkPermission = (userRole, requiredRole) => {
    const roleHierarchy = {
      [ROLES.ADMIN]: 3,
      [ROLES.LIBRARIAN]: 2,
      [ROLES.USER]: 1
    };
  
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
  };
  
  // src/components/RoleBasedRoute.js
  import React from 'react';
  import { Navigate } from 'react-router-dom';
  import { useAuth } from '../contexts/AuthContext';
  import { checkPermission } from '../utils/roles';
  
  const RoleBasedRoute = ({ 
    children, 
    requiredRole = ROLES.USER 
  }) => {
    const { user, isAuthenticated } = useAuth();
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    if (!checkPermission(user.role, requiredRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
  
    return children;
  };
  
  export default RoleBasedRoute;