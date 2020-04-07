const mongoose = require("mongoose");
const Invoices = mongoose.model("Invoices");
const invoicesService = require('../services/invoicesServices')
const HTTP_STATUS = require('http-status-codes')


class invoicesController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        const data = await invoicesService.getAll(id)
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
    const {body: { invoice }} = req;
    try {
      const data = await invoicesService.create(invoice)
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
    const {body: { invoice }} = req;
    if (!invoice) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await invoicesService.update(invoice)
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
      const data = await invoicesService.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)  
    }
  }
}

module.exports = invoicesController;
