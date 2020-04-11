const mongoose = require("mongoose");
const copywritersContractsServices = require('../services/copywritersContractsServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class copywritersContractController {
  static async getAll(req, res, err) {
      try {
        const {id} = req.query
        const data = await copywritersContractsServices.getAll(id)
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
    const {body: { copywriterContract }} = req;
    if (!copywriterContract) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera', ARGUMENT_ERROR)) 
    }
    try {
      const data = await copywritersContractsServices.create(copywriterContract)
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
    const {body: { copywriterContract }} = req;
    if (!copywriterContract) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales copywritera ktorego chcesz edytowac', ARGUMENT_ERROR)) 
    }
    try {
      const data = await copywritersContractsServices.update(copywriterContract)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }



  static async removeByID(req, res, err) {
    const id = (req.query.id) 
    if (!id) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales id', ARGUMENT_ERROR)) 
    }
    try {
      const data = await copywritersContractsServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)
    }
  }
}

module.exports = copywritersContractController;
