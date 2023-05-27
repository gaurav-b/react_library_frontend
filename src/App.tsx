import React from 'react';
import './App.css';
import { Navbar } from './layouts/navbar-and-footer/Navbar';
import { Footer } from './layouts/navbar-and-footer/Footer';
import { HomePage } from './layouts/home-page/HomePage';
import { SearchBooksPage } from './layouts/search-books-page/SearchBooksPage';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import { BookCheckoutPage } from './layouts/book-checkout-page/BookCheckoutPage';
import { SignUp } from './layouts/home-page/SignUp';
import { SignIn } from './layouts/home-page/SignIn';
import { AuthProvider } from './context/AuthContext';

export const App = () => {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <React.StrictMode>
        <AuthProvider>
          <BrowserRouter>
            <Navbar />

            <div className='flex-grow-1'>
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/home' element={<HomePage />} />

                <Route path='/signup' element={<SignUp />} />
                <Route path='/login' element={<SignIn />} />

                <Route path='/search' element={<SearchBooksPage />} />
                <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />

              </Routes>
            </div>

            <Footer />

          </BrowserRouter>
        </AuthProvider>
      </React.StrictMode>
    </div>
  );
}

