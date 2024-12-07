// File: src/components/Auth/Register.js
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Alert 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterValidationSchema } from '../../utils/validation';
import authService from '../../services/authService';

const Register = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setError(null);
      setSuccess(null);

      // Gọi API đăng ký
      const response = await authService.register({
        fullName: values.fullName,
        email: values.email,
        password: values.password
      });

      // Hiển thị thông báo thành công
      setSuccess('Đăng ký thành công! Chuyển đến trang đăng nhập.');
      
      // Reset form
      resetForm();

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Xử lý lỗi đăng ký
      setError(err.message || 'Đăng ký thất bại');
    }

    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Đăng Ký Tài Khoản</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" dismissible>
                  {success}
                </Alert>
              )}

              <Formik
                initialValues={{ 
                  fullName: '',
                  email: '', 
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={RegisterValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ 
                  errors, 
                  touched, 
                  isSubmitting 
                }) => (
                  <Form>
                    <div className="mb-3">
                      <label>Họ và Tên</label>
                      <Field 
                        name="fullName" 
                        type="text" 
                        className={`form-control ${
                          errors.fullName && touched.fullName ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập họ và tên"
                      />
                      {errors.fullName && touched.fullName && (
                        <div className="invalid-feedback">
                          {errors.fullName}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label>Email</label>
                      <Field 
                        name="email" 
                        type="email" 
                        className={`form-control ${
                          errors.email && touched.email ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập địa chỉ email"
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label>Mật Khẩu</label>
                      <Field 
                        name="password" 
                        type="password" 
                        className={`form-control ${
                          errors.password && touched.password ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập mật khẩu"
                      />
                      {errors.password && touched.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label>Xác Nhận Mật Khẩu</label>
                      <Field 
                        name="confirmPassword" 
                        type="password" 
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập lại mật khẩu"
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <div className="d-grid gap-2">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng Ký'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p>
                  Đã có tài khoản? 
                  <Link to="/login" className="ms-2">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;