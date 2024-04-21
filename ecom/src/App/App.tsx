import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductPage from './pages/ProductPage';
import Categories from './pages/Categories';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product">
          <Route path=":id" element={<ProductPage productId={'id'} />} />
        </Route>
        <Route path="/about" element={<AboutUs />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
