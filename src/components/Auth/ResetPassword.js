// File: src/components/Auth/ResetPassword.js
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
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { ResetPasswordSchema } from '../../utils/validation';

const ResetPassword = () => {
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(null);

      // Gọi API đặt lại mật khẩu
      await authService.resetPassword(token, values.newPassword);

      // Hiển thị thông báo thành công
      setSuccess('Mật khẩu đã được đặt lại thành công!');

      // Chuyển hướng đến trang đăng nhập sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      // Xử lý lỗi
      setError(err.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Đặt Lại Mật Khẩu</h3>
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
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validationSchema={ResetPasswordSchema}
                onSubmit={handleSubmit}
              >
                {({ 
                  errors, 
                  touched, 
                  isSubmitting 
                }) => (
                  <Form>
                    <div className="mb-3">
                      <label>Mật Khẩu Mới</label>
                      <Field 
                        name="newPassword" 
                        type="password" 
                        className={`form-control ${
                          errors.newPassword && touched.newPassword ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập mật khẩu mới"
                      />
                      {errors.newPassword && touched.newPassword && (
                        <div className="invalid-feedback">
                          {errors.newPassword}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label>Xác Nhận Mật Khẩu Mới</label>
                      <Field 
                        name="confirmPassword" 
                        type="password" 
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword ? 'is-invalid' : ''
                        }`} 
                        placeholder="Nhập lại mật khẩu mới"
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
                        {isSubmitting ? 'Đang xử lý...' : 'Đặt Lại Mật Khẩu'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;