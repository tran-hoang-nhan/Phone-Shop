import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import Header from '../components/Header';

const Products = () => {
  const { state, actions } = useApp();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    actions.loadProducts();
  }, [actions]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(state.products);
    } else {
      setFilteredProducts(state.products.filter(p => p.category === selectedCategory));
    }
  }, [state.products, selectedCategory]);

  const categories = ['all', ...new Set(state.products.map(p => p.category))];

  const handleAddToCart = (product) => {
    actions.addToCart(product.id, 1, product.price);
  };

  return (
    <div className="products-page">
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Products</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link> &gt; <span>Products</span>
            </nav>
          </div>
        </section>

        <section className="products-section">
          <div className="container">
            <div className="filters">
              <h3>Categories</h3>
              {categories.map(category => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="category">{product.category}</p>
                    <p className="price">${product.price}</p>
                    <p className="stock">Stock: {product.stock}</p>
                    <div className="product-actions">
                      <Link to={`/products/${product.id}`} className="btn btn-secondary">
                        View Details
                      </Link>
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary"
                        disabled={product.stock === 0}
                      >
                        Add to Cart
                      </button>
                    </div>
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

export default Products;