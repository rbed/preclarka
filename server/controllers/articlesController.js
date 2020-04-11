const mongoose = require("mongoose");
const articlesServices = require('../services/articlesServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS

class articlesController {
  static async getAll(req, res, err) {
      try {
        const {id} = req.query
        const data = await articlesServices.getAll(id)
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
    const {body: { article }} = req;
    if (!article) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales artykulu', ARGUMENT_ERROR)) 
    }
    try {
      const data = await articlesServices.create(article)
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
    const {body: { article }} = req;
    if (!article) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales artykulu ktory chcesz zmienic', ARGUMENT_ERROR))  
    }
    try {
      const data = await articlesServices.update(article)
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
      const data = await articlesServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err)  
    }
  }
}

module.exports = articlesController;
