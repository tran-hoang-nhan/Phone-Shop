const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên sản phẩm'],
    maxlength: [200, 'Tên sản phẩm không được quá 200 ký tự']
  },
  brand: {
    type: String,
    required: [true, 'Vui lòng nhập thương hiệu'],
    enum: ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Other']
  },
  category: {
    type: String,
    required: [true, 'Vui lòng chọn danh mục'],
    enum: ['Smartphone', 'Accessory', 'Tablet', 'Smartwatch']
  },
  price: {
    type: Number,
    required: [true, 'Vui lòng nhập giá sản phẩm'],
    min: [0, 'Giá không được âm']
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả sản phẩm']
  },
  specifications: {
    screen: String,
    os: String,
    camera: String,
    chip: String,
    ram: String,
    storage: String,
    battery: String,
    weight: String
  },
  images: [{
    type: String
  }],
  stock: {
    type: Number,
    required: [true, 'Vui lòng nhập số lượng tồn kho'],
    min: [0, 'Số lượng không được âm'],
    default: 0
  },
  rating: {
    type: Number,
    min: [0, 'Rating phải từ 0-5'],
    max: [5, 'Rating phải từ 0-5'],
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better search performance
ProductSchema.index({ name: 'text', brand: 'text', description: 'text' });
ProductSchema.index({ brand: 1, category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });

module.exports = mongoose.model('Product', ProductSchema);
