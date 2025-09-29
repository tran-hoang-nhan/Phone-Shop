export class Product {
  constructor(name, price, category, description, image, stock = 0, specifications = {}) {
    this.id = 'PROD' + Date.now() + Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.stock = stock;
    this.specifications = specifications;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

export class ProductModel {
  constructor() {
    this.storageKey = 'phone_shop_products';
  }

  getProducts() {
    try {
      console.log('🔍 Checking localStorage for products...');
      const productsData = localStorage.getItem(this.storageKey);
      
      if (productsData) {
        console.log('💾 Found products in localStorage');
        const parsed = JSON.parse(productsData);
        console.log('📦 Parsed products:', parsed.length, 'items');
        return parsed;
      } else {
        console.log('🆕 No products in localStorage, using defaults');
        const defaults = this.getDefaultProducts();
        console.log('📦 Default products:', defaults.length, 'items');
        return defaults;
      }
    } catch (error) {
      console.error('❌ Error getting products:', error);
      return this.getDefaultProducts();
    }
  }

  getDefaultProducts() {
    return [
      {
        id: 'PROD001',
        name: 'iPhone 13 Pro',
        price: 999.99,
        category: 'Smartphone',
        description: 'Latest iPhone with Pro camera system',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 50,
        specifications: {
          display: '6.1-inch Super Retina XDR',
          processor: 'A15 Bionic chip',
          storage: '128GB, 256GB, 512GB, 1TB',
          camera: 'Pro 12MP camera system'
        }
      },
      {
        id: 'PROD002',
        name: 'Samsung Galaxy S23',
        price: 899.99,
        category: 'Smartphone',
        description: 'Premium Android smartphone',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 30,
        specifications: {
          display: '6.1-inch Dynamic AMOLED',
          processor: 'Snapdragon 8 Gen 2',
          storage: '128GB, 256GB',
          camera: 'Triple camera system'
        }
      },
      {
        id: 'PROD003',
        name: 'Google Pixel 8',
        price: 699.99,
        category: 'Smartphone',
        description: 'AI-powered photography smartphone',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 25,
        specifications: {
          display: '6.2-inch OLED',
          processor: 'Google Tensor G3',
          storage: '128GB, 256GB',
          camera: 'Dual camera with AI features'
        }
      },
      {
        id: 'PROD004',
        name: 'OnePlus 11',
        price: 749.99,
        category: 'Smartphone',
        description: 'Fast charging flagship phone',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 20,
        specifications: {
          display: '6.7-inch AMOLED',
          processor: 'Snapdragon 8 Gen 2',
          storage: '128GB, 256GB, 512GB',
          camera: 'Triple camera system'
        }
      },
      {
        id: 'PROD005',
        name: 'iPhone 14',
        price: 799.99,
        category: 'Smartphone',
        description: 'Latest iPhone with improved camera',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 40,
        specifications: {
          display: '6.1-inch Super Retina XDR',
          processor: 'A15 Bionic chip',
          storage: '128GB, 256GB, 512GB',
          camera: 'Dual camera system'
        }
      },
      {
        id: 'ACC001',
        name: 'Wireless Charger',
        price: 49.99,
        category: 'Accessory',
        description: 'Fast wireless charging pad',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 50,
        specifications: {
          power: '15W fast charging',
          compatibility: 'Qi-enabled devices',
          design: 'Slim and portable',
          safety: 'Overcharge protection'
        }
      },
      {
        id: 'ACC002',
        name: 'Phone Case',
        price: 29.99,
        category: 'Accessory',
        description: 'Protective phone case',
        image: '/assets/img/products/phones/placeholder.svg',
        stock: 100,
        specifications: {
          material: 'TPU and PC',
          protection: 'Drop protection up to 6ft',
          design: 'Slim profile',
          compatibility: 'Multiple phone models'
        }
      }
    ];
  }

  getProductById(productId) {
    const products = this.getProducts();
    return products.find(product => product.id === productId) || null;
  }

  saveProducts(products) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
      throw error;
    }
  }

  createProduct(productData) {
    const product = new Product(
      productData.name,
      productData.price,
      productData.category,
      productData.description,
      productData.image,
      productData.stock,
      productData.specifications
    );
    
    const products = this.getProducts();
    products.push(product);
    this.saveProducts(products);
    
    return product;
  }

  updateProduct(productId, updates) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex >= 0) {
      products[productIndex] = { ...products[productIndex], ...updates, updatedAt: new Date().toISOString() };
      this.saveProducts(products);
      return products[productIndex];
    }
    
    throw new Error(`Product ${productId} not found`);
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const filteredProducts = products.filter(p => p.id !== productId);
    
    if (filteredProducts.length === products.length) {
      throw new Error(`Product ${productId} not found`);
    }
    
    this.saveProducts(filteredProducts);
    return true;
  }
}