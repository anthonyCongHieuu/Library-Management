// src/models/Borrow.js
export default class Borrow {
    constructor(
      id = null,
      bookId,
      userId,
      borrowDate,
      returnDate
    ) {
      this.id = id;
      this.bookId = bookId;
      this.userId = userId;
      this.borrowDate = borrowDate;
      this.returnDate = returnDate;
    }
  }
  
  // src/services/borrowService.js
  import axios from 'axios';
  
  const BASE_URL = 'http://localhost:5000/api/borrows';
  
  export const borrowService = {
    borrowBook: async (borrowData) => {
      try {
        const response = await axios.post(BASE_URL, borrowData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    returnBook: async (id) => {
      try {
        await axios.delete(`${BASE_URL}/${id}`);
      } catch (error) {
        throw error;
      }
    },
  
    getBorrowedBooks: async (userId) => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  };