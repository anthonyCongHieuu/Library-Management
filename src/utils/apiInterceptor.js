// File: src/utils/apiInterceptor.js
import axios from 'axios';
import authService from '../services/authService';

const setupInterceptors = (navigate) => {
  // Request interceptor
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token') || 
                    sessionStorage.getItem('token');
      
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Nếu token hết hạn (status 401)
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Thử refresh token
          const newToken = await authService.refreshToken();
          
          // Cập nhật token mới
          localStorage.setItem('token', newToken);
          
          // Thử lại request ban đầu
          return axios(originalRequest);
        } catch (refreshError) {
          // Nếu refresh token thất bại, buộc đăng xuất
          authService.logout();
          
          // Chuyển hướng đến trang đăng nhập
          navigate('/login');
          
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;