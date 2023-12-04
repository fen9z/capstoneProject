const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const holdSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  holdUntil: {
    // 24 hours holding time
    type: Date,
    default: Date.now() + 24 * 60 * 60 * 1000,
  },
});

module.exports = mongoose.model('Hold', holdSchema);
