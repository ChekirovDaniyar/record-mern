const api = require('express').Router();
const UserController = require('../../controllers/user.controller');
const { checkToken, checkIsAdmin } = require('../../middleware/tokenMiddleware');

const {
  create,
  get,
  getById,
  deleteById,
  updateById,
  login,
} = new UserController();

//TODO Check this variant of admin check middleware
api.post('/create', [checkIsAdmin], create);
api.get('/all', [checkIsAdmin], get);
api.post('/login', login);
api.get('/:id', [checkToken], getById);
api.delete('/:id', [checkIsAdmin], deleteById);
api.patch('/:id', [checkIsAdmin], updateById);

module.exports = api;
