const BaseModel = require('./base.model');
const bcrypt = require('bcryptjs');
const collection = require('../collections/user.collection');
const { ErrorHandler } = require("../lib/handlers");


class UserModel extends BaseModel {
  constructor() {
    super();
  }
  static async create({ item }) {
    try {
      const createdItem = await super.create({ item, collection });
      if (item.password) {
        const salt = await bcrypt.genSalt(10);
        createdItem.password = await bcrypt.hash(item.password, salt);
      }
      await createdItem.save();
      return createdItem;
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async getById(id) {
    try {
      return await super.findById({ id, collection });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async find(filter) {
    try {
      const user = await super.findMany({ filter, collection });
      console.log('user', user, filter);
      return user;
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async get() {
    try {
      const users = await super.findMany({
        filter: {},
        collection,
      });

      return users && users.length > 0 ? users : [];

    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

  static async deleteById(id) {
    try {
      return await super.deleteById({ id, collection });
    } catch (error) {
      throw new ErrorHandler(error.statusCode);
    }
  }

}

module.exports = UserModel;
