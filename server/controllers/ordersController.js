const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");
const ordersService = require('../services/ordersServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS



class ordersController {
  static async getAll(req, res, err) {
      try{
        const {id} = req.query
        const data = await ordersService.getOrders(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        ErrorHandeler.handle(req, res, err)          
    }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { order }} = req;
    if (!order) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales zamowienia', ARGUMENT_ERROR)) 
    }
    try {
      const data = await ordersService.create(order)
      return res.status(HTTP_STATUS.OK).jason(data)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }

  /**
   *
   * @async
   */

  static async update(req, res, err) {
    const {body: { order }} = req;
    if (!order) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales adresu jaki chcesz zmienic', ARGUMENT_ERROR)) 
    }
    try {
      const data = await ordersService.update(order)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch (err) {
      ErrorHandeler.handle(req, res, err)
    }
  }



  static async removeByID(req, res, err) {
    const id = req.query.id;
    if(!id) {
      return ErrorHandeler.handle(req, res, new AppError('nie podałes id', ARGUMENT_ERROR)) 
    }   
    try {
      console.log(id);
      const data = await ordersService.delete(id);
      return res.status(HTTP_STATUS.OK).json(data)
    } 
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
}
}

module.exports = ordersController;
