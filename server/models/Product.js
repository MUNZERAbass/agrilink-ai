const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, default: 'kg' },
  stock: { type: Number, required: true, default: 0 },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Dairy', 'Coffee', 'Tea', 'Grains', 'Livestock', 'Organic'],
    required: true,
  },
  images: [{ type: String }],
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  district: { type: String },
  harvestDate: { type: Date },
  isAvailable: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  deliveryAvailable: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
