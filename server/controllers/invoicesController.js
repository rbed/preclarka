const mongoose = require("mongoose");
const Invoices = mongoose.model("Invoices");
const invoicesService = require('../services/invoicesServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class invoicesController {
  static async getAll(req, res, err) {
      try {
        const {id} = req.query
        const data = await invoicesService.getAll(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }
      catch (err) {
        ErrorHandeler.handle(req, res, err)
      }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { invoice }} = req;
    if (!invoice) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales faktury', ARGUMENT_ERROR)) 
    }
    try {
      const data = await invoicesService.create(invoice)
      return res.status(HTTP_STATUS.OK).json(data)
    } 
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }


  /**
   * @async
   */

  static async update(req, res, err) {
    const {body: { invoice }} = req;
    if (!invoice) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales faktury jaki chcesz zmienic', ARGUMENT_ERROR)) 
    }
    try {
      const data = await invoicesService.update(invoice)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }



  static async removeByID(req, res, err) {
    const id = (req.query.id) 
    if (!id) {
      return ErrorHandeler.handle(req, res, new AppError('nie podałes id', ARGUMENT_ERROR))  
    }
    try {
      const data = await invoicesService.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err) 
    }
  }
}

module.exports = invoicesController;
