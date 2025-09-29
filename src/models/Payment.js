export class Payment {
  constructor(orderId, amount, paymentMethod, cardDetails = null) {
    this.id = 'PAY' + Date.now();
    this.orderId = orderId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.cardDetails = cardDetails;
    this.status = 'pending';
    this.timestamp = new Date().toISOString();
  }
}

export class PaymentModel {
  constructor() {
    this.storageKey = 'phone_shop_payments';
  }

  getPayments() {
    try {
      const paymentsData = localStorage.getItem(this.storageKey);
      return paymentsData ? JSON.parse(paymentsData) : [];
    } catch (error) {
      console.error('Error getting payments:', error);
      return [];
    }
  }

  savePayments(payments) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(payments));
    } catch (error) {
      console.error('Error saving payments:', error);
      throw error;
    }
  }

  createPayment(orderId, amount, paymentMethod, cardDetails = null) {
    const payment = new Payment(orderId, amount, paymentMethod, cardDetails);
    const payments = this.getPayments();
    payments.push(payment);
    this.savePayments(payments);
    return payment;
  }

  processPayment(paymentId) {
    const payments = this.getPayments();
    const paymentIndex = payments.findIndex(payment => payment.id === paymentId);
    
    if (paymentIndex >= 0) {
      const success = Math.random() < 0.9;
      payments[paymentIndex].status = success ? 'completed' : 'failed';
      payments[paymentIndex].processedAt = new Date().toISOString();
      this.savePayments(payments);
      return payments[paymentIndex];
    }
    
    throw new Error(`Payment ${paymentId} not found`);
  }
}