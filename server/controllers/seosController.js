const mongoose = require("mongoose");
const Seos = mongoose.model("Seos");
const seosService = require('../services/seosServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class seosController {
  
  /**
   * @param {object} req 
   * @param {object} res 
   * @param {object} err
   * @returns list of users
   */
  static async getAll(req, res, err) {
    if(req.query){
      try{
        const {id, name, lastname} = req.query
        const data = await seosService.getAll(id, name, lastname)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        ErrorHandeler.handle(req, res, err)         
      }
    }
  }



  /**
   * @async
   * @returns created seo
   */
  static async create(req, res, err) {
    const {body: { seo }} = req;
    if(!seo) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales pozycjonera', ARGUMENT_ERROR)) 
    }
    try{
      const doc = await seosService.create(seo)
      return res.status(200).json(doc)
    }catch(err){
      ErrorHandeler.handle(req, res, err) 
    }
  }

  /**
   * @async
   * @returns updated seo
   */

  static async update(req, res, err) {
    const {body: { seo }} = req;
    if (!seo) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales pozycjonera którego chcesz edytować', ARGUMENT_ERROR)) 
    }
    try {
      const doc = await seosService.update(seo)
      return res.status(HTTP_STATUS.OK).json(doc)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err) 
    }
  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} err
   * @returns deleted seo
   * @async 
   * x
   */
  static async removeByID(req, res, err) {
    const {id} = req.query;
    try {
      if(!id) {
        return ErrorHandeler.handle(req, res, new AppError('nie podałes id', ARGUMENT_ERROR)) 
      } else {
        const doc = await seosService.delete(id)
        res.status(HTTP_STATUS.OK).json(doc)
    }
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err) 
    }
  }
}

module.exports = seosController;
