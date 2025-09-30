import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import Header from '../components/Header';

const Home = () => {
  const { state, actions } = useApp();

  useEffect(() => {
    if (state.products.length === 0) {
      actions.loadProducts();
    }
    actions.loadCart();
  }, [actions, state.products.length]);

  const featuredProducts = state.products.slice(0, 4);

  if (state.loading) {
    return (
      <div className="home-page">
        <Header />
        <main>
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Header />
      
      <main>
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1>Welcome to Phone Shop</h1>
              <p>Discover the latest smartphones and accessories</p>
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
            </div>
          </div>
        </section>

        <section className="featured-products">
          <div className="container">
            <h2>Featured Products</h2>
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.thumbnail} alt={product.title} />
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p className="brand">{product.brand}</p>
                    <p className="price">${product.price}</p>
                    <p className="rating">{product.rating} ⭐</p>
                    <Link to={`/products/${product.id}`} className="btn btn-secondary">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;