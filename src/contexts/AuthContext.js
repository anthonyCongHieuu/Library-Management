// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    status: 'INITIAL',
    loading: true
  });

  // Loại bỏ useNavigate khỏi context
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      
      // Trả về thông tin đăng nhập thay vì điều hướng
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    // Loại bỏ việc điều hướng trực tiếp
    authService.logout();
    setAuthState({
      user: null,
      status: 'UNAUTHENTICATED',
      loading: false
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};