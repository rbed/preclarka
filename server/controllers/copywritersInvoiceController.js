const mongoose = require("mongoose");
const copywritersInvoicesServices = require('../services/copywritersInvoicesServices')
const HTTP_STATUS = require('http-status-codes')


class copywriterInvoiceController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        console.log('copy invoice');
        const data = await copywritersInvoicesServices.getAll(id)
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
    const {body: { copywriterInvoice }} = req;
    try {
      const data = await copywritersInvoicesServices.create(copywriterInvoice)
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
    const {body: { copywriterInvoice }} = req;
    if (!copywriterInvoice) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await copywritersInvoicesServices.update(copywriterInvoice)
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
      const data = await copywritersInvoicesServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)  
    }
  }
}

module.exports = copywriterInvoiceController;
