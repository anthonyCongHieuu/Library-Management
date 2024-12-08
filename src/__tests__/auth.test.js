// src/__tests__/auth.test.js
import { generateToken, verifyToken } from '../middleware/auth';

describe('Authentication Middleware', () => {
  const mockUser = {
    id: 1,
    email: 'test@example.com',
    role: 'user'
  };

  test('Generate and Verify Token', () => {
    // Tạo token
    const token = generateToken(mockUser);
    
    // Xác minh token
    const decoded = verifyToken(token);
    
    expect(decoded).toBeTruthy();
    expect(decoded.email).toBe(mockUser.email);
  });

  test('Invalid Token', () => {
    const invalidToken = 'invalid-token';
    const decoded = verifyToken(invalidToken);
    
    expect(decoded).toBeNull();
  });
});