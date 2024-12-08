// File: src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import setupInterceptors from '../utils/apiInterceptor';

// Enum trạng thái xác thực
const AUTH_STATES = {
  INITIAL: 'INITIAL',
  AUTHENTICATED: 'AUTHENTICATED',
  UNAUTHENTICATED: 'UNAUTHENTICATED'
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    status: AUTH_STATES.INITIAL,
    loading: true
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Thiết lập interceptors
    setupInterceptors(navigate);

    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token') || 
                      sessionStorage.getItem('token');
        
        if (token) {
          // Validate token
          const userData = await authService.validateToken(token);
          
          setAuthState({
            user: userData,
            status: AUTH_STATES.AUTHENTICATED,
            loading: false
          });
        } else {
          setAuthState(prev => ({
            ...prev,
            status: AUTH_STATES.UNAUTHENTICATED,
            loading: false
          }));
        }
      } catch (error) {
        // Token không hợp lệ
        setAuthState({
          user: null,
          status: AUTH_STATES.UNAUTHENTICATED,
          loading: false
        });
      }
    };

    checkAuthentication();
  }, [navigate]);

  const login = async (credentials, rememberMe = false) => {
    try {
      const response = await authService.login(credentials, rememberMe);
      
      // Lưu token và user
      const storageMethod = rememberMe ? localStorage : sessionStorage;
      storageMethod.setItem('token', response.token);
      storageMethod.setItem('user', JSON.stringify(response.user));

      setAuthState({
        user: response.user,
        status: AUTH_STATES.AUTHENTICATED,
        loading: false
      });

      return response;
    } catch (error) {
      // Xử lý lỗi đăng nhập
      throw error;
    }
  };

  const logout = () => {
    // Đăng xuất trên server
    authService.logout();

    // Xóa token và user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    setAuthState({
      user: null,
      status: AUTH_STATES.UNAUTHENTICATED,
      loading: false
    });

    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  // Các phương thức khác như updateUser, hasPermission...

  return (
    <AuthContext.Provider 
      value={{ 
        ...authState, 
        login, 
        logout 
      }}
    >
      {!authState.loading && children}
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