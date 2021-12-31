const BaseController = require('./base.controller');
const branchModel = require('../models/branch.model');
const { handleApiError, handleApiSuccess } = require('../lib/handlers')


class BranchController extends BaseController {
  constructor() {
    super();
    this.model = branchModel;
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  async create(req, res) {
    try {
      const item = req.body;
      await this.model.create(item);

      const result = await this.model.get();
      handleApiSuccess(res, 201, 'Филиал успешно создан!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }
  async get(req, res) {
    try {
      const result = await this.model.get();
      handleApiSuccess(res, 200, 'Филиалы получены!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }
}

module.exports = BranchController;
