const BaseController = require('./base.controller');
const salesModel = require('../models/sales.model');
const productModel = require('../models/product.model');
const { handleApiError, handleApiSuccess } = require('../lib/handlers');
const mongoose = require("mongoose");


class SalesController extends BaseController {
  constructor() {
    super();
    this.model = salesModel;
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
  }

  async create(req, res) {
    try {
      const { productId, userId, branchId } = req.body;
      const result = await this.model.create({ item: {
          productId, userId, branchId, date: Date.now()
        }});
      handleApiSuccess(res, 201, 'Продажи сохранены!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, error);
    }
  }

  async get(req, res) {
    try {
      const filter = req.query;
      const sales = await this.model.find(filter);
      const products = await productModel.find({'_id':{ $in: sales.map(el => el.productId) }});
      const productsSales = sales.map(sale => products.find(pr => pr._id.toString() === sale.productId) || null);

      const result = {
        total: productsSales.reduce((sum, item) => sum + item.price, 0),
        products: productsSales.filter(Boolean),
      };

      handleApiSuccess(res, 200, 'Продажи получены!', result);
    } catch (error) {
      handleApiError(res, error.statusCode, error);
    }
  }

}

module.exports = SalesController;
