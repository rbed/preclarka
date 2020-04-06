const mongoose = require("mongoose");
const Seos = mongoose.model("Seos");
const seosService = require('../services/seosServices')
const HTTP_STATUS = require('http-status-codes')

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
        const data = await seosService.getSeos(id, name, lastname)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        return  res.status(400).json(err)          
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
      return res.status(400).send('nie podales seo ktorego chcesz stworzyc')
    }
    try{
      const doc = await seosService.createSeo(seo)
      return res.status(200).json(doc)
    }catch(err){
      return res.status(400).json(err)
    }
  }

  /**
   * @async
   * @returns updated seo
   */

  static async update(req, res, err) {
    const {body: { seo }} = req;
    if (!seo) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const doc = await seosService.updateSeo(seo)
      return res.status(HTTP_STATUS.OK).json(doc)
    }
    catch(err) {
      return res.status(400).json(err)
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
    if (req.query) {
      try {
        const {id} = req.query;
        if (!id) {
          res.status(HTTP_STATUS.BAD_REQUEST).send('nie podałeś id')
        } else {
          const doc = await seosService.deleteSeo(id)
          res.status(HTTP_STATUS.OK).json(doc)
      }
      }
      catch(err) {
        res.status(HTTP_STATUS.BAD_REQUEST).json(err)
      }
    }
  }
}

module.exports = seosController;
