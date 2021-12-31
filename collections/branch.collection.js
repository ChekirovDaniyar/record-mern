const mongoose = require('mongoose');


const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const branchCollection = mongoose.model('branches', branchSchema);

module.exports = branchCollection;
