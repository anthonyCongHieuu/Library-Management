// src/__tests__/bookService.test.js
import axios from 'axios';
import { fetchBooks, borrowBook } from '../services/bookService';

describe('Book Service Integration', () => {
  test('Fetch Books Successfully', async () => {
    const books = await fetchBooks();
    expect(books).toBeTruthy();
    expect(books.length).toBeGreaterThan(0);
  });

  test('Borrow Book Process', async () => {
    const bookId = 1;
    const userId = 1;
    
    const result = await borrowBook(bookId, userId);
    
    expect(result).toBeTruthy();
    expect(result.status).toBe('Borrowed');
  });
});