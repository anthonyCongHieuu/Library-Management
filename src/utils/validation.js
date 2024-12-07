// File: src/utils/validation.js
import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .required('Vui lòng nhập mật khẩu')
});

export const RegisterValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Vui lòng nhập họ và tên'),
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .required('Vui lòng nhập mật khẩu'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    .required('Vui lòng xác nhận mật khẩu')
});

export const ResetPasswordSchema = Yup.object().shape({
  token: Yup.string()
    .required('Mã xác thực không được để trống'),
  newPassword: Yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu mới'),
});
