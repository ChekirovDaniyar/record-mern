const BaseModel = require('./base.model');
const collection = require('../collections/branch.collection');
const {ErrorHandler} = require('../lib/handlers')


class BranchModel extends BaseModel {
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

  static async get() {
    try {
      return await super.findMany({ filter: {}, collection });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }
}

module.exports = BranchModel;
