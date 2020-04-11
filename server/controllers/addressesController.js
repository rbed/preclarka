const addressesServices = require('../services/addressesServices')
const HTTP_STATUS = require('http-status-codes')
const logger = require('../modules/logger/logger')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class addressesController {
  static async getAll(req, res, err) {
    try {
      const {id} = req.query
      const data = await addressesServices.getAll(id)
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
    const {body: { address }} = req;
    if (!address) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales adresu', ARGUMENT_ERROR)) 
    }
    try {
      const data = await addressesServices.create(address)
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
    const {body: { address }} = req;
    if (!address) {
        // return res.status(400).send('nie podałeś co chcesz zmmienic')
        return ErrorHandeler.handle(req, res, new AppError('nie podales id', ARGUMENT_ERROR))  
    }
    try {
      const data = await addressesServices.update(address)
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
      const data = await addressesServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)  
    }
  }
}

module.exports = addressesController;
