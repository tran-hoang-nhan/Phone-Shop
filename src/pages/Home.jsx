import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import Header from '../components/Header';

const Home = () => {
  const { state, actions } = useApp();

  useEffect(() => {
    console.log('🏠 Home component mounted, loading data...');
    actions.loadProducts();
    actions.loadCart();
  }, []);

  const featuredProducts = state.products.slice(0, 4);
  
  console.log('🏠 Home render - Products in state:', state.products.length);
  console.log('🏠 Home render - Featured products:', featuredProducts.length);

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
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">${product.price}</p>
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