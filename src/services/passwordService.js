// File: src/services/passwordService.js
import bcrypt from 'bcryptjs';

class PasswordService {
  // Mã hóa mật khẩu
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  // Kiểm tra mật khẩu
  comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  // Kiểm tra độ mạnh mật khẩu
  validatePasswordStrength(password) {
    const errors = [];

    if (password.length < 8) {
      errors.push('Mật khẩu phải có ít nhất 8 ký tự');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất một chữ hoa');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất một chữ thường');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất một số');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Mật khẩu phải chứa ít nhất một ký tự đặc biệt');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Sinh mật khẩu ngẫu nhiên
  generateRandomPassword(length = 12) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
  }
}

export default new PasswordService();