const {ErrorHandler, handleApiError} = require("../lib/handlers");
const jwt = require('jsonwebtoken');
const config = require('config');
const UserCollection = require('../collections/user.collection');


const getTokenFromHeader = req => req.headers['authorization'];

const checkToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return handleApiError(res, 401, 'Вы не авторизованы');
    }

    const verified = await jwt.verify(token, config.get('secret'));

    if (!verified || !Object.keys(verified).includes('user')) {
      return handleApiError(res, 401, 'Вы не авторизованы');
    }

    const { user: { id } } = verified;

    const user = await UserCollection.findOne({
      _id: id,
      token,
    });
    if (user) {
      req.token = token;
      req.user = user;
      next();
    } else {
      return handleApiError(res, 404, 'Ошибка проверки пользователя!');
    }
  } catch (error) {
    throw new ErrorHandler(error.statusCode);
  }
};
// TODO: check error from catch block with normal tokens and mode it token getting to utils
const checkIsAdmin = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return handleApiError(res, 401, 'Вы не авторизованы');
    }

    const verified = await jwt.verify(token, config.get('secret'));

    if (!verified || !Object.keys(verified).includes('user')) {
      return handleApiError(res, 401, 'Вы не авторизованы');
    }
    const { user: { id } } = verified;

    const user = await UserCollection.findOne({
      _id: id,
    });

    if (user.isAdmin) {
      next();
    } else {
      return handleApiError(res, 403, 'Я вас не звал, идите нахуй!');
    }
  } catch (error) {
    return handleApiError(res, error.statusCode, 'Произошла ошибка!');
  }
};

module.exports = { checkToken, checkIsAdmin };