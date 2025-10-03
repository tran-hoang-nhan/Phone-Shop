import { apiService } from './api';

export class CartService {
  async getCart() {
    return await apiService.get('/cart');
  }

  async addToCart(product, name, price, image, quantity = 1) {
    return await apiService.post('/cart/add', {
      product,
      name,
      price,
      image,
      quantity
    });
  }

  async updateCartItem(product, quantity) {
    return await apiService.put('/cart/update', {
      product,
      quantity
    });
  }

  async removeFromCart(productId) {
    return await apiService.delete(`/cart/remove/${productId}`);
  }

  async clearCart() {
    return await apiService.delete('/cart/clear');
  }
}

export const cartService = new CartService();