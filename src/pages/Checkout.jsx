import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { paymentService } from '../services/paymentService';
import Header from '../components/Header';

const Checkout = () => {
  const { state, actions } = useApp();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    
    try {
      const order = paymentService.createOrderFromCart(state.cart);
      await paymentService.processPayment(order.id, { paymentMethod, ...paymentDetails });
      
      actions.clearCart();
      alert('Payment successful!');
      navigate('/');
    } catch (error) {
      alert('Payment failed: ' + error.message);
    }
  };

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="checkout-page">
      <Header />
      <main>
        <div className="container">
          <h1>Checkout</h1>
          
          <div className="checkout-content">
            <div className="order-summary">
              <h3>Order Summary</h3>
              {state.cart.map(item => (
                <div key={item.productId} className="order-item">
                  <span>{item.productId}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="order-total">
                <strong>Total: ${total.toFixed(2)}</strong>
              </div>
            </div>

            <form onSubmit={handlePayment} className="payment-form">
              <h3>Payment Details</h3>
              
              <div className="payment-methods">
                <label>
                  <input 
                    type="radio" 
                    value="credit_card" 
                    checked={paymentMethod === 'credit_card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  Credit Card
                </label>
              </div>

              {paymentMethod === 'credit_card' && (
                <div className="card-details">
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Card Holder"
                    value={paymentDetails.cardHolder}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="MM"
                    value={paymentDetails.expiryMonth}
                    onChange={(e) => setPaymentDetails({...paymentDetails, expiryMonth: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    value={paymentDetails.expiryYear}
                    onChange={(e) => setPaymentDetails({...paymentDetails, expiryYear: e.target.value})}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                    required
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                Complete Payment
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;