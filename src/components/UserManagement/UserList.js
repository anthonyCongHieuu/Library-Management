// File: src/components/UserManagement/UserList.js
import React, { useEffect, useState } from 'react';
import userService from '../../services/userService';
import roleService from '../../services/roleService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await userService.getUsers();
        const roleData = await roleService.getRoles();
        setUsers(userData);
        setRoles(roleData);
      } catch (err) {
        setError('Không thể tải dữ liệu người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser  = async (userId) => {
    try {
      await userService.deleteUser (userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Không thể xóa người dùng');
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai Trò</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{roles.find(role => role.id === user.roleId)?.name}</td>
              <td>
                <button onClick={() => handleDeleteUser (user.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;