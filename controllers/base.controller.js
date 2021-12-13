const BaseModel = require('../models/base.model');
const { handleApiSuccess, handleApiError } = require('../lib/handlers');

class BaseController {
  constructor(collection) {
    this.collection = collection;
  }

  async create(req, res) {
    try {
      const item = await BaseModel.create({
        item: res.body,
        collection: this.collection,
      });

      handleApiSuccess(res, 201, 'Успешно создан!', item);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!')
    }
  }

  async getById(req, res) {
    try {
      const item = await BaseModel.findById({
        id: req.params.id,
        collection: this.collection,
      });

      handleApiSuccess(res, 200, 'Успешный запрос!', item);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async get(req, res) {
    try {
      const items = await BaseModel.findMany({
        filter: req.body.filter,
        collection: this.collection,
      });

      handleApiSuccess(res, 200, "Успешный запрос", items);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async updateById(req, res) {
    try {
      const item = await BaseModel.updateById({
        id: req.params.id,
        data: req.body.data,
        collection: this.collection,
      });

      handleApiSuccess(res, 200, "Успешно обновлено!", item);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Не удалось обновить!');
    }
  }

  async deleteById(req, res) {
    try {
      const item = await BaseModel.deleteById({
        id: req.params.id,
        data: req.body.data,
        collection: this.collection,
      });

      handleApiSuccess(res, 200, "deleted item by id", item);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Ошибка удаления!');
    }
  }

}

module.exports = BaseController;