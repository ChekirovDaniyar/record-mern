const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: '',
  },
  token: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.methods.genAuthToken = async function() {
  const user = this;
  const payload = {
    user: {
      id: user._id.toString(),
      account_type: user.account_type
    }
  };
  const token = await jwt.sign(payload, config.get("secret"));

  user.token = token;
  await user.save();
  return token;
};

const UserCollection = mongoose.model('users', userSchema);

module.exports = UserCollection;
