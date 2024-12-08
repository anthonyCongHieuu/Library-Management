// src/models/Book.js
export default class Book {
    constructor(
      id = null, 
      title, 
      author, 
      isbn, 
      publishYear, 
      quantity, 
      category
    ) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.isbn = isbn;
      this.publishYear = publishYear;
      this.quantity = quantity;
      this.category = category;
    }
  }
  
  // src/services/bookService.js
  import axios from 'axios';
  
  const BASE_URL = 'http://localhost:5000/api/books';
  
  export const bookService = {
    getAllBooks: async () => {
      try {
        const response = await axios.get(BASE_URL);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    getBookById: async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    createBook: async (bookData) => {
      try {
        const response = await axios.post(BASE_URL, bookData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    updateBook: async (id, bookData) => {
      try {
        const response = await axios.put(`${BASE_URL}/${id}`, bookData);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    deleteBook: async (id) => {
      try {
        await axios.delete(`${BASE_URL}/${id}`);
      } catch (error) {
        throw error;
      }
    }
  };