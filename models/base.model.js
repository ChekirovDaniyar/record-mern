const bcrypt = require('bcryptjs');
const {ErrorHandler} = require('../lib/handlers');


class BaseModel {
  constructor() {
  }

  static async create({item, collection}) {
    try {
      const createdItem = await new collection(item);
      if (item.password) {
        const salt = await bcrypt.genSalt(10);
        createdItem.password = await bcrypt.hash(item.password, salt);
      }
      await createdItem.save();
      return createdItem;
    } catch (error) {
      ErrorHandler(500, 'Произошла ошибка!');
    }
  }

  static async findById({id, collection}) {
    try {
      return await collection.findById(id);
    } catch (error) {

    }
  }

  static async findMany(
    {
      filter = {},
      collection
    }
  ) {
    try {
      return await collection.find(filter);
    } catch (error) {
      throw new ErrorHandler(500, `Произошла ошибка!`);
    }
  }

  static async findByFilter({collection, filter = {}}) {
    try {
      return await collection.find(filter)
    } catch (error) {
      ErrorHandler(500, 'Произошла ошибка!');
    }
  }

  static async deleteById({id, collection}) {
    try {
      const item = await collection.findById(id);
      await item.remove();
      return item;
    } catch (error) {
      ErrorHandler(500);
    }
  }

  static async updateById({id, data, collection}) {
    try {
      if (data.password) {
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);
      }

      return await collection.findOneAndUpdate({ _id: id }, data);
    } catch (error) {
      throw new ErrorHandler(500);
    }
  }

}

module.exports = BaseModel;
