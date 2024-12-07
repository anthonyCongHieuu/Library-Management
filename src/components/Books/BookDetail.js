// File: src/components/Books/BookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
import bookService from '../../services/bookService';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetail();
  }, [bookId]);

  const fetchBookDetail = async () => {
    try {
      setLoading(true);
      const data = await bookService.getBookById(bookId);
      setBook(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/books');
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      {book && (
        <Card>
          <Card.Img variant="top" src={book.imageUrl} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              <strong>Tác giả:</strong> {book.author}<br />
              <strong>Thể loại:</strong> {book.genre}<br />
              <strong>Trạng thái:</strong> {book.status}<br />
              <strong>Mô tả:</strong> {book.description}
            </Card.Text>
            <Button variant="secondary" onClick={handleBack}>Quay lại</Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default BookDetail;