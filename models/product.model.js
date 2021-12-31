const BaseModel = require('./base.model');
const collection = require('../collections/product.collection');
const { ErrorHandler } = require('../lib/handlers');


class ProductModel extends BaseModel {
  constructor() {
    super();
  }

  static async create(item) {
    try {
      return await super.create({ item, collection });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async find(filter) {
    try {
      return await super.findMany({ filter, collection })
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async findById(id) {
    try {
      const result = await super.findById({ id, collection });
      return result._doc;
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async updateById (id, data) {
    try {
      const result = await super.updateById({ id, data, collection });
      return result._doc;
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async deleteById (id) {
    try {
      return await super.deleteById({ id, collection });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }
}

module.exports = ProductModel;
