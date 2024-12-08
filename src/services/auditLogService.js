// File: src/services/auditLogService.js
import api from '../utils/api';

class AuditLogService {
  // Ghi nhật ký đăng nhập
  async logLogin(userId, ipAddress) {
    try {
      await api.post('/audit-logs/login', {
        userId,
        ipAddress,
        timestamp: new Date().toISOString(),
        action: 'LOGIN'
      });
    } catch (error) {
      console.error('Không thể ghi nhật ký đăng nhập', error);
    }
  }

  // Ghi nhật ký thay đổi mật khẩu
  async logPasswordChange(userId) {
    try {
      await api.post('/audit-logs/password-change', {
        userId,
        timestamp: new Date().toISOString(),
        action: 'PASSWORD_CHANGE'
      });
    } catch (error) {
      console.error('Không thể ghi nhật ký thay đổi mật khẩu', error);
    }
  }

  // Lấy nhật ký hoạt động của người dùng
  async getUserActivityLogs(userId) {
    try {
      const response = await api.get(`/audit-logs/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Không thể lấy nhật ký hoạt động', error);
      return [];
    }
  }
}

export default new AuditLogService();