const mongoose = require("mongoose");
const contractsServices = require('../services/contractsServices')
const HTTP_STATUS = require('http-status-codes')


class contractsController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        const data = await contractsServices.getAll(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }
      catch (err) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
      }
    }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { contract }} = req;
    try {
      const data = await contractsServices.create(contract)
      return res.status(HTTP_STATUS.OK).json(data)
    } 
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
    }
  }


  /**
   * @async
   */

  static async update(req, res, err) {
    const {body: { contract }} = req;
    if (!contract) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await contractsServices.update(contract)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
    }
  }



  static async removeByID(req, res, err) {
    const id = (req.query.id) 
    if (!id) {
      return res.status(400).send("złe id");
    }
    try {
      const data = await contractsServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)  
    }
  }
}

module.exports = contractsController;
