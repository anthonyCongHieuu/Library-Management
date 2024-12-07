// File: src/components/Auth/Login.js
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
import { LoginValidationSchema } from '../../utils/validation';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      // Gọi API đăng nhập
      const response = await authService.login({
        email: values.email,
        password: values.password
      });

      // Lưu thông tin người dùng và token
      login(response.user, response.token);

      // Chuyển hướng đến dashboard
      navigate('/dashboard');
    } catch (err) {
      // Xử lý lỗi đăng nhập
      setError(err.message || 'Đăng nhập thất bại');
    }

    setSubmitting(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Đăng Nhập Hệ Thống Thư Viện</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible>
                  {error}
                </Alert>
              )}

              <Formik
                initialValues={{ 
                  email: '', 
                  password: '' 
                }}
                validationSchema={LoginValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ 
                  errors, 
                  touched, 
                  isSubmitting 
                }) => (
                  <Form>
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

                    <div className="d-grid gap-2">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng Nhập'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p>
                  Chưa có tài khoản? 
                  <Link to="/register" className="ms-2">
                    Đăng ký ngay
                  </Link>
                </p>
                <Link to="/forgot-password">
                  Quên mật khẩu?
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;