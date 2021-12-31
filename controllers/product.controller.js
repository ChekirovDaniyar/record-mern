const BaseController = require('./base.controller');
const productModel = require('../models/product.model');
const { handleApiError, handleApiSuccess } = require('../lib/handlers');


class ProductController extends BaseController {
  constructor() {
    super();
    this.model = productModel;
    this.create = this.create.bind(this);
    this.updateById = this.updateById.bind(this);
    this.getAll = this.getAll.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(req, res) {
    try {
      const item = req.body;
      await this.model.create(item);

      const result = await this.model.find();
      handleApiSuccess(res, 201, 'Товар успешно создан', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async updateById(req, res) {
    try {
      const result = await this.model.updateById(req.params.id, req.body);

      handleApiSuccess(res, 200, 'Товар успешно обновлен!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async getAll(req, res) {
    try {
      const result = await this.model.find();
      handleApiSuccess(res, 200, 'Товары успешно получены!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async findById(req, res) {
    try {
      const result = await this.model.findById(req.params.id);
      handleApiSuccess(res, 200, 'Товар найден!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async deleteById(req, res) {
    try {
      await this.model.deleteById(req.params.id);

      const result = await this.model.find();
      handleApiSuccess(res, 200, 'Товар успешно удален!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

}

module.exports = ProductController;
