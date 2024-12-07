// File: src/services/bookService.js
import api from '../utils/api';

const bookService = {
  // Lấy danh sách sách
  getAllBooks: async (params = {}) => {
    try {
      const response = await api.get('/books', { params });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Lấy danh sách sách thất bại');
    }
  },

  // Lấy chi tiết sách
  getBookById: async (bookId) => {
    try {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Lấy chi tiết sách thất bại');
    }
  },

  // Thêm sách mới
  createBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Thêm sách mới thất bại');
    }
  },

  // Cập nhật sách
  updateBook: async (bookId, bookData) => {
    try {
      const response = await api.put(`/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Cập nhật sách thất bại');
    }
  },

  // Xóa sách
  deleteBook: async (bookId) => {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Xóa sách thất bại');
    }
  },

  // Mượn sách
  borrowBook: async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/borrow`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Mượn sách thất bại');
    }
  },

  // Trả sách
  returnBook: async (bookId) => {
    try {
      const response = await api.post(`/books/${bookId}/return`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Trả sách thất bại');
    }
  },

  // Tìm kiếm sách
  searchBooks: async (query) => {
    try {
      const response = await api.get('/books/search', { 
        params: { query } 
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Tìm kiếm sách thất bại');
    }
  }
};

export default bookService;