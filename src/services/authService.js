// File: src/services/authService.js
import api from '../utils/api';

const authService = {
  login: async (credentials, rememberMe = false) => {
    try {
      const response = await api.post('/auth/login', {
        ...credentials,
        rememberMe // Truyền thêm flag ghi nhớ
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Đăng nhập thất bại');
    }
  },
  
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Đăng ký thất bại');
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Gửi yêu cầu đặt lại mật khẩu thất bại');
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', { 
        token, 
        newPassword 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Đặt lại mật khẩu thất bại');
    }
  },

  // Thêm phương thức validate token
  validateToken: async (token) => {
    try {
      const response = await api.post('/auth/validate-token', { token });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Token không hợp lệ');
    }
  },

  logout: async () => {
    try {
      // Gọi API đăng xuất để hủy token phía server (nếu có)
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Thêm phương thức lấy thông tin người dùng
  getUserProfile: async () => {
    try {
      const response = await api.get('/auth/profile');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Không thể lấy thông tin người dùng');
    }
  }
};

export default authService;