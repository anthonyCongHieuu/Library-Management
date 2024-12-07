// File: src/components/Books/BookList.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Form,
  Spinner,
  Alert
} from 'react-bootstrap';
import bookService from '../../services/bookService';
import { useAuth } from '../../contexts/AuthContext';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await bookService.searchBooks(searchQuery);
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrowBook = async (bookId) => {
    try {
      await bookService.borrowBook(bookId);
      // Cập nhật trạng thái sách sau khi mượn
      fetchBooks();
    } catch (err) {
      setError(err.message);
    }
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
      <h2 className="my-4">Danh Sách Sách</h2>
      
      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="search">
          <Form.Control 
            type="text" 
            placeholder="Tìm kiếm sách..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">Tìm kiếm</Button>
      </Form>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {books.map((book) => (
          <Col md={4} key={book.id} className="mb-4">
            <Card>
              <Card.Img variant="top" src={book.imageUrl} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Tác giả:</strong> {book.author}<br />
                  <strong>Thể loại:</strong> {book.genre}<br />
                  <strong>Trạng thái:</strong> {book.status}
                </Card.Text>
                {book.status === 'Available' ? (
                  <Button 
                    variant="primary" 
                    onClick={() => handleBorrowBook(book.id)}
                  >
                    Mượn Sách
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Đã Mượn
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
