const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discountPercentage: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    width: Number,
    height: Number,
    depth: Number
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [{
    rating: Number,
    comment: String,
    date: Date,
    reviewerName: String,
    reviewerEmail: String
  }],
  returnPolicy: String,
  minimumOrderQuantity: {
    type: Number,
    default: 1
  },
  meta: {
    createdAt: Date,
    updatedAt: Date,
    barcode: String,
    qrCode: String
  },
  images: [String],
  thumbnail: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes for better search performance
ProductSchema.index({ title: 'text', brand: 'text', description: 'text' });
ProductSchema.index({ brand: 1, category: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ rating: -1 });
ProductSchema.index({ id: 1 });

module.exports = mongoose.model('Product', ProductSchema);
