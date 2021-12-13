const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
const config = require('config');
const cors = require('cors');
const app = express();

const userAPI = require('./endpoints/api/user');
const productAPI = require('./endpoints/api/product');
const salesAPI = require('./endpoints/api/sales');

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/user', userAPI);
app.use('/product', productAPI);
app.use('/sales', salesAPI);
// TODO: set API urls to use


if (process.env.NODE_END === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log('Server successfully started');
    })
  } catch (error) {
    console.log('SERVER ERROR!', error);
  }
};

start();
