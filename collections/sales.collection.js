const mongoose = require('mongoose');


const SalesSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  branchId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const salesCollection = mongoose.model('sales', SalesSchema);

module.exports = salesCollection;
