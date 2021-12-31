const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: 'ring',
  },
  amount: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const productCollection = mongoose.model('products', productSchema);

module.exports = productCollection;
