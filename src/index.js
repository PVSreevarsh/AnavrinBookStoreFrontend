import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Cart from './pages/Cart/Cart';
import SignUp from './pages/SignUp/SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route index path = "book" element = {<BookList />} />
          <Route path = "cart" element = {<Cart />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        </Route>
        <Route path = "signup" element = {<SignUp />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

