const mongoose = require("mongoose");
const contractsServices = require('../services/contractsServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class contractsController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        const data = await contractsServices.getAll(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }
      catch (err) {
        ErrorHandeler.handle(req, res, err)
      }
    }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { contract }} = req;
    if (!contract) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales umowy', ARGUMENT_ERROR)) 
    }
    try {
      const data = await contractsServices.create(contract)
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
    const {body: { contract }} = req;
    if (!contract) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales id', ARGUMENT_ERROR))
    }
    try {
      const data = await contractsServices.update(contract)
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
      const data = await contractsServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)  
    }
  }
}

module.exports = contractsController;
