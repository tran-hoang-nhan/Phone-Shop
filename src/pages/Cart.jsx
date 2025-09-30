import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import Header from '../components/Header';

const Cart = () => {
  const { state, actions } = useApp();

  useEffect(() => {
    if (state.products.length === 0) {
      actions.loadProducts();
    }
    actions.loadCart();
  }, [state.products.length]);

  const getProductById = (productId) => {
    return state.products.find(p => p.id === productId);
  };

  const calculateTotal = () => {
    return state.cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0).toFixed(2);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      actions.removeFromCart(productId);
    } else {
      actions.updateCartQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    actions.removeFromCart(productId);
  };

  if (state.loading) {
    return (
      <div className="cart-page">
        <Header />
        <main>
          <div className="container">
            <h1>Loading...</h1>
          </div>
        </main>
      </div>
    );
  }

  if (state.cart.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <main>
          <div className="container">
            <h1>Shopping Cart</h1>
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      
      <main>
        <section className="page-header">
          <div className="container">
            <h1>Shopping Cart</h1>
            <nav className="breadcrumb">
              <Link to="/">Home</Link> {'>'} <span>Cart</span>
            </nav>
          </div>
        </section>

        <section className="cart-section">
          <div className="container">
            <div className="cart-items">
              {state.cart.map(item => {
                const product = getProductById(item.productId);
                if (!product) return null;

                return (
                  <div key={item.productId} className="cart-item">
                    <img src={product.thumbnail} alt={product.title} />
                    <div className="item-details">
                      <h3>{product.title}</h3>
                      <p className="brand">{product.brand}</p>
                      <p className="price">${product.price}</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <div className="item-total">
                      ${(product.price * item.quantity).toFixed(2)}
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.productId)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Cart;