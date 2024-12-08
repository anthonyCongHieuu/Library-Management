// File: src/services/twoFactorAuthService.js
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import api from '../utils/api';

class TwoFactorAuthService {
  // Tạo bí mật 2FA
  generateSecret(username) {
    return speakeasy.generateSecret({
      name: `LibraryMS:${username}`
    });
  }

  // Tạo QR Code để kết nối ứng dụng xác thực
  async generateQRCode(secret) {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) reject(err);
        resolve(data_url);
      });
    });
  }

  // Xác minh mã 2FA
  verifyToken(secret, token) {
    return speakeasy.totp.verify({
      secret: secret.base32,
      encoding: 'base32',
      token: token
    });
  }

  // Kích hoạt 2FA cho người dùng
  async enableTwoFactor(userId, secret) {
    try {
      await api.post('/auth/enable-2fa', {
        userId,
        secret: secret.base32
      });
    } catch (error) {
      console.error('Không thể kích hoạt 2FA', error);
      throw error;
    }
  }

  // Vô hiệu hóa 2FA
  async disableTwoFactor(userId) {
    try {
      await api.post('/auth/disable-2fa', { userId });
    } catch (error) {
      console.error('Không thể vô hiệu hóa 2FA', error);
      throw error;
    }
  }
}

export default new TwoFactorAuthService();