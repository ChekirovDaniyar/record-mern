const BaseController = require('./base.controller');
const userModel = require('../models/user.model');
const { handleApiError, handleApiSuccess } = require("../lib/handlers");
const bcrypt = require('bcryptjs');


class UserController extends BaseController {
  constructor() {
    super();
    this.model = userModel;
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.get = this.get.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.login = this.login.bind(this);
  }

  async create(req, res) {
    try {
      const userData = req.body;
      const user = await this.model.create({ item: userData });
      await user.genAuthToken();

      const result = await this.model.find();

      handleApiSuccess(res, 201, 'Пользователь успешно создан!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!')
    }
  }

  async login (req, res) {
    try {
      const { name, password } = req.body;
      const userDoc = await this.model.find({ name });
      if (!userDoc.length) {
        return handleApiError(res, 404, 'Пользователь не найден!');
      }
      const token = await userDoc[0].genAuthToken();
      const { password: passwordFromDB, ...user } = userDoc[0];
      const isPasswordCorrect = await bcrypt.compare(password, passwordFromDB);

      if (isPasswordCorrect) {
        delete user._doc.password;
        return handleApiSuccess(res, 200, 'Вы успешно вошли в систему!', {
          ...user._doc,
          token,
        });
      }
      return handleApiError(res, 400, 'Неверный пароль');
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;
      const userData = await this.model.getById(id);
      const { password, ...user } = userData._doc;

      handleApiSuccess(res, 200, "Пользователь получен!", user);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async get(req, res) {
    try {
      const users = await this.model.get({});
      const result = users.map(item => ({
        name: item.name,
        _id: item._id,
        isAdmin: item.isAdmin,
      }));
      handleApiSuccess(res, 200, "", result);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!');
    }
  }

  async deleteById(req, res) {
    try {
      const user = await super.deleteById(req, res);

      handleApiSuccess(res, 200, 'Успешное удаление!', user);
    } catch (error) {
      handleApiError(res, error.statusCode, 'Произошла ошибка!')
    }
  }

}

module.exports = UserController;
