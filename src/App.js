// File: src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const Login = lazy(() => import('./components/Auth/Login'));
const Register = lazy(() => import('./components/Auth/Register'));
const Dashboard = lazy(() => import('./components/Dashboard/UserDashboard'));
const BookList = lazy(() => import('./components/Books/BookList'));
const BookAdd = lazy(() => import('./components/Books/BookAdd'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
