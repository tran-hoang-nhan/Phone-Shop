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
        setLoading(true);
        const productData = await productService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Failed to load product:', error);
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

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, Math.min(product.stock, prev + change)));
  };

  const handleAddToCart = () => {
    actions.addToCart(product.id, quantity, product.price);
    alert(`Added ${quantity} ${product.title} to cart`);
  };

  return (
    <div className="product-detail-page">
      <Header />
      <main>
        <section className="page-header">
          <div className="container">
            <h1>{product.title}</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link> {'>'} 
              <Link to="/products">Products</Link> {'>'} 
              <span>{product.title}</span>
            </nav>
          </div>
        </section>

        <section className="product-detail-section">
          <div className="container">
            <div className="product-detail">
              <div className="product-gallery">
                <div className="main-image">
                  <img src={product.thumbnail} alt={product.title} />
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="image-thumbnails">
                    {product.images.slice(1, 4).map((img, index) => (
                      <img key={index} src={img} alt={`${product.title} ${index + 1}`} />
                    ))}
                  </div>
                )}
              </div>
              
              <div className="product-info">
                <h1>{product.title}</h1>
                <div className="product-meta">
                  <span className="product-id">ID: {product.id}</span>
                  <span className="product-brand">Brand: {product.brand}</span>
                  <span className="product-rating">Rating: {product.rating} ⭐</span>
                </div>
                <div className="product-price">
                  <span>${product.price}</span>
                  <span className="discount">-{product.discountPercentage}%</span>
                </div>
                <div className="product-stock">
                  <span className="in-stock">In Stock</span>
                  <span>{product.stock} available</span>
                </div>
                <div className="product-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
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
                        <tr>
                          <th>Brand</th>
                          <td>{product.brand}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>{product.category}</td>
                        </tr>
                        <tr>
                          <th>Weight</th>
                          <td>{product.weight}g</td>
                        </tr>
                        <tr>
                          <th>Dimensions</th>
                          <td>{product.dimensions?.width} x {product.dimensions?.height} x {product.dimensions?.depth} cm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div className="tab-content">
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <span className="rating-value">{product.rating}</span>
                        <div className="stars">⭐⭐⭐⭐⭐</div>
                        <span className="rating-count">Based on customer reviews</span>
                      </div>
                      {product.reviews && product.reviews.map((review, index) => (
                        <div key={index} className="review">
                          <div className="review-header">
                            <span className="reviewer">{review.reviewerName}</span>
                            <span className="rating">{review.rating} ⭐</span>
                          </div>
                          <p>{review.comment}</p>
                        </div>
                      ))}
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