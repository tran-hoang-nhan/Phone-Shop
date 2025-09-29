export class CartItem {
  constructor(productId, quantity = 1, price = 0) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.addedAt = new Date().toISOString();
  }
}

export class CartModel {
  constructor() {
    this.storageKey = 'phone_shop_cart';
  }

  getCart() {
    try {
      const cartData = localStorage.getItem(this.storageKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error getting cart:', error);
      return [];
    }
  }

  saveCart(cartItems) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
  }

  addToCart(productId, quantity = 1, price = 0) {
    const cart = this.getCart();
    const existingItemIndex = cart.findIndex(item => item.productId === productId);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push(new CartItem(productId, quantity, price));
    }

    this.saveCart(cart);
    return cart;
  }

  removeFromCart(productId) {
    const cart = this.getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    this.saveCart(filteredCart);
    return filteredCart;
  }

  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        return this.removeFromCart(productId);
      }
      cart[itemIndex].quantity = quantity;
      this.saveCart(cart);
    }

    return cart;
  }

  clearCart() {
    this.saveCart([]);
    return [];
  }

  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}