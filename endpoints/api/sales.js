const api = require('express').Router();
const SalesController = require('../../controllers/sales.controller');
const { checkToken, checkIsAdmin } = require('../../middleware/tokenMiddleware');


const { create, get } = new SalesController();

api.post('create', [checkToken], create);
api.get('/get', [checkToken, checkIsAdmin], get);

module.exports = api;
