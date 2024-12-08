// src/components/Admin/UserManagement.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Table, 
  Button, 
  Modal, 
  Form,
  Alert 
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../services/userService';
import { ROLES } from '../../utils/roles';

const UserManagementSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Tên không được để trống')
    .min(2, 'Tên quá ngắn'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Email không được để trống'),
  role: Yup.string()
    .oneOf(Object.values(ROLES), 'Vai trò không hợp lệ')
    .required('Vai trò không được để trống')
});

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError('Không thể tải danh sách người dùng');
    }
  };

  const handleCreateUser = async (values, { resetForm }) => {
    try {
      await userService.createUser(values);
      fetchUsers();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Tạo người dùng thất bại');
    }
  };

  const handleUpdateUser = async (values) => {
    try {
      await userService.updateUser(selectedUser.id, values);
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      setError('Cập nhật người dùng thất bại');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userService.deleteUser(id);
      fetchUsers();
    } catch (err) {
      setError('Xóa người dùng thất bại');
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button 
        onClick={() => {
          setSelectedUser(null);
          setShowModal(true);
        }}
      >
        Thêm Người Dùng Mới
      </Button>

      <Table striped bordered hover>
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
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button 
                  variant="warning" 
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                >
                  Sửa
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedUser ? 'Cập Nhật Người Dùng' : 'Thêm Người Dùng Mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              selectedUser || {
                fullName: '',
                email: '',
                password: '',
                role: ROLES.USER
              }
            }
            validationSchema={UserManagementSchema}
            onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          >
            {({ 
              values, 
              errors, 
              touched, 
              handleChange, 
              handleBlur, 
              handleSubmit 
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Tên Đầy Đủ</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.fullName && errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Vai Trò</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.role && errors.role}
                  >
                    {Object.values(ROLES).map(role => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </Form.Control> <Form.Control.Feedback type="invalid">
                    {errors.role}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit">
                  {selectedUser  ? 'Cập Nhật' : 'Thêm'}
                </Button>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Hủy
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserManagement;