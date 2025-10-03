const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Product = require('./models/Product');

dotenv.config();

const importProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Đọc file JSON
    const jsonPath = path.join(__dirname, '..', 'phoneShop.products.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    
    // Lấy products từ JSON
    const products = jsonData;
    
    console.log(`Found ${products.length} products to import`);
    
    // Xóa tất cả products cũ
    await Product.deleteMany({});
    console.log('Deleted existing products');

    // Import products mới
    await Product.insertMany(products);
    console.log(`Imported ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
};

importProducts();