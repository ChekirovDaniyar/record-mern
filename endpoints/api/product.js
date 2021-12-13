const api = require('express').Router();
const ProductController = require('../../controllers/product.controller');
const { checkToken, checkIsAdmin } = require('../../middleware/tokenMiddleware');

const {
  create,
  getAll,
  findById,
  updateById,
  deleteById,
} = new ProductController();

api.post('/create', [checkIsAdmin, checkToken], create);
api.get('/all', [checkToken], getAll);
api.get('/:id', [checkIsAdmin, checkToken], findById);
api.patch('/:id', [checkIsAdmin, checkToken], updateById);
api.delete('/:id', [checkIsAdmin, checkToken], deleteById);

module.exports = api;
