const BaseModel = require('./base.model');
const collection = require('../collections/sales.collection');
const {ErrorHandler} = require('../lib/handlers');

class SalesModel extends BaseModel {
  constructor() {
    super();
  }

  static async create({item}) {
    try {
      const createdItem = await super.create({item, collection});
      await createdItem.save();
      return createdItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async find(filter) {
    try {
      const { userId, from, to, branchId } = filter;
      return await super.findMany({
        filter: {
          date: { $gte: from, $lt: to },
          ...(userId ? {userId} : {}),
          ...(branchId && branchId !== 'all' ? {branchId} : {}),
        },
        collection
      });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

}

module.exports = SalesModel;
