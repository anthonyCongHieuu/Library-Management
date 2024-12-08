// File: src/components/Auth/TwoFactorSetup.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import twoFactorAuthService from '../../services/twoFactorAuthService';

const TwoFactorSetup = () => {
  const [secret, setSecret] = useState(null);
  const [qrCode, setQRCode] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const setupTwoFactor = async () => {
      try {
        // Tạo bí mật 2FA
        const newSecret = twoFactorAuthService.generateSecret(user.username);
        
        // Tạo QR Code
        const qrCodeUrl = await twoFactorAuthService.generateQRCode(newSecret);
        
        setSecret(newSecret);
        setQRCode(qrCodeUrl);
      } catch (err) {
        setError('Không thể thiết lập 2FA');
      }
    };

    setupTwoFactor();
  }, [user]);

  const handleVerification = async () => {
    try {
      // Xác minh mã token
      const isValid = twoFactorAuthService.verifyToken(secret, verificationCode);
      
      if (isValid) {
        // Kích hoạt 2FA
        await twoFactorAuthService.enableTwoFactor(user.id, secret);
        alert('2FA đ ã được kích hoạt thành công!');
      } else {
        setError('Mã xác minh không hợp lệ');
      }
    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình kích hoạt 2FA');
    }
  };

  return (
    <div className="two-factor-setup">
      <h2>Thiết lập xác thực hai yếu tố (2FA)</h2>
      {error && <div className="error">{error}</div>}
      {qrCode && (
        <div>
          <img src={qrCode} alt="QR Code" />
          <p>Quét mã QR bằng ứng dụng xác thực của bạn.</p>
        </div>
      )}
      <div>
        <label>Mã xác minh</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
      </div>
      <button onClick={handleVerification}>Kích hoạt 2FA</button>
    </div>
  );
};

export default TwoFactorSetup;