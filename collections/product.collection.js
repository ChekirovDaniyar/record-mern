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
    default: 'lenses',
  },
});

const productCollection = mongoose.model('products', productSchema);

module.exports = productCollection;
