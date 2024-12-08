// src/components/Borrow/BorrowManagement.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import { borrowService } from '../../services/borrowService';

const BorrowManagement = () => {
  const [borrows, setBorrows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const data = await borrowService.getBorrowedBooks(userId); // userId cần được xác định
      setBorrows(data);
    } catch (err) {
      setError('Không thể tải danh sách mượn sách');
    }
  };

  const handleReturnBook = async (id) => {
    try {
      await borrowService.returnBook(id);
      fetchBorrows();
    } catch (err) {
      setError('Trả sách thất bại');
    }
  };

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Tiêu Đề</th>
            <th>Tác Giả</th>
            <th>Ngày Mượn</th>
            <th>Ngày Trả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map(borrow => (
            <tr key={borrow.id}>
              <td>{borrow.book.title}</td>
              <td>{borrow.book.author}</td>
              <td>{new Date(borrow.borrowDate).toLocaleDateString()}</td>
              <td>{borrow.returnDate ? new Date(borrow.returnDate).toLocaleDateString() : 'Chưa trả'}</td>
              <td>
                <Button 
                  variant="danger" 
                  onClick={() => handleReturnBook(borrow.id)}
                >
                  Trả Sách
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BorrowManagement;