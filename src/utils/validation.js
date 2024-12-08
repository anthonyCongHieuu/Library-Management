// File: src/utils/validation.js
import * as Yup from 'yup';

// Schema kiểm tra hợp lệ cho đăng nhập
export const LoginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không hợp lệ')
    .required('Vui lòng nhập email'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải ít nhất 8 ký tự')
    .required('Vui lòng nhập mật khẩu')
});

// Schema kiểm tra hợp lệ cho đăng ký
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

// Schema kiểm tra hợp lệ cho đặt lại mật khẩu
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

// Schema kiểm tra hợp lệ cho sách
export const BookValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Tiêu đề sách không được để trống')
    .min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  author: Yup.string()
    .required('Tác giả không được để trống'),
  isbn: Yup.string()
    .required('Mã ISBN không được để trống')
    .matches(/^\d{10}|\d{13}$/, 'Mã ISBN không hợp lệ'),
  publishYear: Yup.number()
    .required('Năm xuất bản không được để trống')
    .min(1800, 'Năm xuất bản không hợp lệ')
    .max(new Date().getFullYear(), 'Năm xuất bản không được lớn hơn năm hiện tại'),
  quantity: Yup.number()
    .required('Số lượng không được để trống')
    .min(0, 'Số lượng không được âm'),
  category: Yup.string()
    .required('Danh mục không được để trống')
});
