// src/components/Books/BookManagement.js
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
import { bookService } from '../../services/bookService';
import { BookValidationSchema } from '../../utils/validation';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Không thể tải danh sách sách');
    }
  };

  const handleAddBook = async (values, { resetForm }) => {
    try {
      await bookService.createBook(values);
      fetchBooks();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Thêm sách thất bại');
    }
  };

  const handleUpdateBook = async (values) => {
    try {
      await bookService.updateBook(selectedBook.id, values);
      fetchBooks();
      setShowModal(false);
    } catch (err) {
      setError('Cập nhật sách thất bại');
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await bookService.deleteBook(id);
      fetchBooks();
    } catch (err) {
      setError('Xóa sách thất bại');
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Button 
        onClick={() => {
          setSelectedBook(null);
          setShowModal(true);
        }}
      >
        Thêm Sách Mới
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tiêu Đề</th>
            <th>Tác Giả</th>
            <th>ISBN</th>
            <th>Năm Xuất Bản</th>
            <th>Số Lượng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>{book.publishYear}</td>
              <td>{book.quantity}</td>
              <td>
                <Button 
                  variant="warning" 
                  onClick={() => {
                    setSelectedBook(book);
                    setShowModal(true);
                  }}
                >
                  Sửa
                </Button>
                <Button 
                  variant="danger" 
                  onClick={() => handleDeleteBook(book.id)}
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
            {selectedBook ? 'Cập Nhật Sách' : 'Thêm Sách Mới'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              selectedBook || {
                title: '',
                author: '',
                isbn: '',
                publishYear: '',
                quantity: '',
                category: ''
              }
            }
            validationSchema={BookValidationSchema}
            onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
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
                {/* Các trường nhập liệu tương tự */}
                <Button type="submit">
                  {selectedBook ? 'Cập Nhật' : 'Thêm'}
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

export default BookManagement;