import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './pages/Cart';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App
