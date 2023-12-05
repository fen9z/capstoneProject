const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = Schema({
  itemId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  storePlace: { type: String, required: true },
  storageNumber: { type: Number, required: true, default: 0 },
  holdedNumber: { type: Number, required: true, default: 0 },
  realUrl: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

module.exports = mongoose.model('Product', productSchema);
