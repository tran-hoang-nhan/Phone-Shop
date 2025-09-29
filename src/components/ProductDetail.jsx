import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { productService } from '../services/productService';
import Header from './Header';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { actions } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specifications');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        console.log('🔍 ProductDetail: Loading product', id);
        setLoading(true);
        const productData = await productService.getProductById(id);
        console.log('✅ ProductDetail: Product loaded:', productData);
        setProduct(productData);
      } catch (error) {
        console.error('❌ ProductDetail: Failed to load product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header />
        <main>
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <Header />
        <main>
          <div className="container">
            <h1>Product not found</h1>
            <Link to="/products" className="btn btn-primary">Back to Products</Link>
          </div>
        </main>
      </div>
    );
  }

  const specifications = product.specifications ? Object.entries(product.specifications).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value
  })) : [];

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + change)));
  };

  const handleAddToCart = () => {
    actions.addToCart(product.id, quantity, product.price);
    alert(`Added ${quantity} ${product.name} to cart`);
  };

  return (
    <div className="product-detail-page">
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>{product.name}</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link> &gt; 
              <Link to="/products">Products</Link> &gt; 
              <span>{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="product-detail-section">
          <div className="container">
            <div className="product-detail">
              <div className="product-gallery">
                <div className="main-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              
              <div className="product-info">
                <h1>{product.name}</h1>
                <div className="product-meta">
                  <span className="product-id">ID: {product.id}</span>
                  <span className="product-category">Category: {product.category}</span>
                </div>
                <div className="product-price">
                  <span>${product.price}</span>
                </div>
                <div className="product-stock">
                  <span className="in-stock">In Stock</span>
                  <span>{product.stock} available</span>
                </div>
                <div className="product-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
                {product.specifications && (
                  <div className="product-features">
                    <h3>Key Features</h3>
                    <ul>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <li key={index}><strong>{key}:</strong> {value}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="product-actions">
                  <div className="quantity-selector">
                    <label>Quantity:</label>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(-1)}>-</button>
                      <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        min="1" 
                        max={product.stock} 
                      />
                      <button onClick={() => handleQuantityChange(1)}>+</button>
                    </div>
                  </div>
                  <button onClick={handleAddToCart} className="btn btn-primary">
                    Add to Cart
                  </button>
                  <button className="btn btn-secondary">Buy Now</button>
                </div>
              </div>
            </div>

            <div className="product-tabs">
              <div className="tabs-header">
                <button 
                  className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('specifications')}
                >
                  Specifications
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveTab('shipping')}
                >
                  Shipping & Returns
                </button>
              </div>
              <div className="tabs-content">
                {activeTab === 'specifications' && (
                  <div className="tab-content">
                    <table className="specs-table">
                      <tbody>
                        {specifications.map((spec, index) => (
                          <tr key={index}>
                            <th>{spec.label}</th>
                            <td>{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="tab-content">
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <span className="rating-value">4.8</span>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <span className="rating-count">Based on 24 reviews</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="tab-content">
                    <p>Free shipping on orders over $50. Returns accepted within 30 days.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetail;