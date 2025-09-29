import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';

const Header = () => {
  const { state } = useApp();
  const cartItemCount = state.cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src="/assets/img/products/logo.svg" alt="Phone Shop Logo" />
            </Link>
          </div>
          <nav className="main-nav">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </nav>
          <div className="header-actions">
            <div className="search-box">
              <input type="text" placeholder="Search products..." />
              <button className="search-btn">🔍</button>
            </div>
            <div className="cart-icon">
              <Link to="/cart">
                🛒 <span className="cart-count">{cartItemCount}</span>
              </Link>
            </div>
            <div className="user-actions">
              <button className="btn-login">Login</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;