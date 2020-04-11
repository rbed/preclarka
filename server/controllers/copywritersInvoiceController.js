const mongoose = require("mongoose");
const copywritersInvoicesServices = require('../services/copywritersInvoicesServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class copywriterInvoiceController {
  static async getAll(req, res, err) {
      try {
        const {id} = req.query
        console.log('copy invoice');
        const data = await copywritersInvoicesServices.getAll(id)
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
    const {body: { copywriterInvoice }} = req;
    if (!copywriterInvoice) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera', ARGUMENT_ERROR)) 
    }
    try {
      const data = await copywritersInvoicesServices.create(copywriterInvoice)
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
    const {body: { copywriterInvoice }} = req;
    if (!copywriterInvoice) {
        return ErrorHandeler.handle(req, res, new AppError('nie podales adresu jaki chcesz zmienić', ARGUMENT_ERROR))  
    }
    try {
      const data = await copywritersInvoicesServices.update(copywriterInvoice)
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
      const data = await copywritersInvoicesServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }
}

module.exports = copywriterInvoiceController;
