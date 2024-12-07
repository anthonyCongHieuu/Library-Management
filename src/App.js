// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/UserDashboard';
import BookList from './components/Books/BookList';
import BookAdd from './components/Books/BookAdd';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Các route công khai */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Các route yêu cầu xác thực */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/books" 
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/books/add" 
            element={
              <PrivateRoute>
                <BookAdd />
              </PrivateRoute>
            } 
          />
          
          {/* Mặc định chuyển hướng */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;