// File: src/components/UserManagement/UserForm.js
import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import roleService from '../../services/roleService';

const UserForm = ({ userId, onSuccess }) => {
  const [user, setUser] = useState({ name: '', email: '', roleId: '' });
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roleData = await roleService.getRoles();
        setRoles(roleData);
      } catch (err) {
        setError('Không thể tải danh sách vai trò');
      }
    };

    fetchRoles();

    if (userId) {
      const fetchUser = async () => {
        try {
          const userData = await userService.getUserById(userId);
          setUser(userData);
        } catch (err) {
          setError('Không thể tải thông tin người dùng');
        }
      };

      fetchUser();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userId) {
        await userService.updateUser(userId, user);
      } else {
        await userService.createUser(user);
      }
      onSuccess();
    } catch (err) {
      setError('Có lỗi xảy ra trong quá trình lưu thông tin người dùng');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userId ? 'Cập Nhật Người Dùng' : 'Tạo Người Dùng'}</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Tên</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Vai Trò</label>
        <select
          name="roleId"
          value={user.roleId}
          onChange={handleChange}
          required
        >
          <option value="">Chọn vai trò</option>
          {roles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <button type="submit">{userId ? 'Cập Nhật' : 'Tạo'}</button>
    </form>
  );
};

export default UserForm;
