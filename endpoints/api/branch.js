const api = require('express').Router();
const BranchController = require('../../controllers/branch.controller');
const { checkToken } = require('../../middleware/tokenMiddleware');

const { create, get } = new BranchController();

api.post('/create', [checkToken], create);
api.get('/all', [checkToken], get);

module.exports = api;
