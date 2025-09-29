import { apiService } from './api';

export class ProductService {
  async getProducts() {
    console.log('🔌 ProductService: Fetching products from API...');
    return await apiService.get('/products');
  }

  async getProductById(id) {
    console.log('🔌 ProductService: Fetching product', id, 'from API...');
    return await apiService.get(`/products/${id}`);
  }
}

export const productService = new ProductService();