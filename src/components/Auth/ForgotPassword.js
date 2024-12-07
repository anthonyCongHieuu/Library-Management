// File: src/components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Alert 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email')
});

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsLoading(true);
    try {
      setError(null);
      setSuccess(null);

      // Gọi API quên mật khẩu
      const response = await authService.forgotPassword(values.email);

      // Hiển thị thông báo thành công
      setSuccess(response.message || 'Đã gửi hướng dẫn đặt lại mật khẩu. Vui lòng kiểm tra email.');
      
      // Reset form
      resetForm();

      // Chuyển hướng đến trang đặt lại mật khẩu sau 3 giây
      setTimeout(() => {
        navigate('/reset-password');
      }, 3000);

    } catch (err) {
      // Xử lý lỗi
      setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Quên Mật Khẩu</h3>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" dismissible onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
                  {success}
                </Alert>
              )}

              <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordSchema}
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

                    <div className="d-grid gap-2">
                      <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={isSubmitting || isLoading}
                      >
                        {isLoading ? 'Đang xử lý...' : 'Gửi Yêu Cầu Đặt Lại Mật Khẩu'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                <p>
                  Quay lại 
                  <Link to="/login" className="ms-2">
                    Đăng nhập
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

export default ForgotPassword;