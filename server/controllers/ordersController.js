const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");
const ordersService = require('../services/ordersServices')
const HTTP_STATUS = require('http-status-codes')

class ordersController {
  static async getAll(req, res, err) {
    if(req.query){
      try{
        const {id} = req.query
        const data = await ordersService.getOrders(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        return  res.status(400).json(err)          
      }
    }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { order }} = req;
    try {
      const data = await ordersService.create(order)
      return res.status(HTTP_STATUS.OK).jason(data)
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
    }
  }

  /**
   *
   * @async
   */

  static async update(req, res, err) {
    const {body: { order }} = req;
    if (!order) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await ordersService.update(order)
      return res.status(HTTP_STATUS.OK).json(data)
    }
    catch (err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
    }
  }



  static async removeByID(req, res, err) {
    const id = req.query.id;
    if(!id) {
      return status(HTTP_STATUS.BAD_REQUEST).send('nie podales id')
    }   
    try {
      console.log(id);
      const data = await ordersService.removeByID(id);
      return res.status(HTTP_STATUS.OK).json(data)
    } 
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
    }
}
}

module.exports = ordersController;
