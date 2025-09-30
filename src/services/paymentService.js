export class PaymentService {
  createOrderFromCart(cart) {
    const orderId = 'ORD' + Date.now();
    
    const order = {
      id: orderId,
      items: cart,
      subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      tax: 0,
      shipping: 0,
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: {
        name: 'Guest Customer',
        email: 'guest@example.com'
      }
    };
    
    const orders = JSON.parse(localStorage.getItem('phone_shop_orders') || '[]');
    orders.push(order);
    localStorage.setItem('phone_shop_orders', JSON.stringify(orders));
    
    return order;
  }

  async processPayment(orderId, paymentDetails) {
    this.validatePaymentDetails(paymentDetails);
    
    const orders = JSON.parse(localStorage.getItem('phone_shop_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex >= 0) {
      orders[orderIndex].status = 'paid';
      orders[orderIndex].paymentId = 'PAY' + Date.now();
      orders[orderIndex].paymentMethod = paymentDetails.paymentMethod;
      localStorage.setItem('phone_shop_orders', JSON.stringify(orders));
      
      return {
        success: true,
        payment: { id: orders[orderIndex].paymentId, status: 'completed' },
        order: orders[orderIndex]
      };
    }
    
    throw new Error('Order not found');
  }

  validatePaymentDetails(paymentDetails) {
    if (!paymentDetails.paymentMethod) {
      throw new Error('Payment method is required');
    }
    
    if (paymentDetails.paymentMethod === 'credit_card') {
      if (!paymentDetails.cardNumber || !paymentDetails.cardHolder) {
        throw new Error('Card details are required');
      }
    }
  }
}

export const paymentService = new PaymentService();