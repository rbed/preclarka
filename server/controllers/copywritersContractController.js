const mongoose = require("mongoose");
const copywritersContractsServices = require('../services/copywritersContractsServices')
const HTTP_STATUS = require('http-status-codes')


class copywritersContractController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        const data = await copywritersContractsServices.getAll(id)
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
    const {body: { copywriterContract }} = req;
    try {
      const data = await copywritersContractsServices.create(copywriterContract)
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
    const {body: { copywriterContract }} = req;
    if (!copywriterContract) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await copywritersContractsServices.update(copywriterContract)
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
      const data = await copywritersContractsServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)  
    }
  }
}

module.exports = copywritersContractController;
