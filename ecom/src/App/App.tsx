import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import * as React from 'react';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import './App.module.scss';
import UserProfile from '@pages/UserProfile';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
