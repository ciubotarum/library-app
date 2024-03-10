import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { Footer } from './layouts/NavbarAndFooter/Footer';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage';
import { oktaConfig } from './lib/oktaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { ReviewLIstPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage';
import { ShelfPage } from './layouts/ShelfPage/ShelfPage';


const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  // const customAuthHandler = () => {
  //   navigate('/login');
  // }

  // const navigate = useNavigate();

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    window.location.href = toRelativeUrl(originalUri || '/', window.location.origin);
  };

  return (
    <div className='d-flex flex-column min-vh-100'>
        <BrowserRouter>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} >
          <Navbar />
          <div className='flex-grow-1'>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomePage />} />
              <Route path='/search' element={<SearchBooksPage />} />
              <Route path='/reviewlist/:bookId' element={<ReviewLIstPage />} />
              <Route path='/checkout/:bookId' element={<BookCheckoutPage />} />
              <Route path='/login' element={<LoginWidget config={oktaConfig} />} />
              <Route path='/login/callback' element={<LoginCallback />} />
              <SecureRoute path='/shelf' element={<ShelfPage/>}/>
            </Routes>
          </div>
          {/* <SecureRoute path='/shelf' element={<ShelfPage/>}>  </SecureRoute> */}
          <Footer />
          </Security>
        </BrowserRouter>
    </div>
  );

}

