const addressesServices = require('../services/addressesServices')
const HTTP_STATUS = require('http-status-codes')
const logger = require('../modules/logger/logger')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')

class addressesController {
  static async getAll(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query
        const data = await addressesServices.getAll(id)
        return res.status(HTTP_STATUS.OK).json(data)
      }
      catch (err) {

        // if (err.status != 0){
        //   return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
        // } 
        //   return res.status(HTTP_STATUS.BAD_REQUEST).json(err)
        ErrorHandeler.hadle(res, err)
            }
    }
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    const {body: { address }} = req;
    console.log(address);
    try {
      const data = await addressesServices.create(address)
      //logger.success('Created new Address',JSON.parse(address))
      return res.status(HTTP_STATUS.OK).json(data)

    } 
    catch(err) {
      // logger.error('error while creating new address',err)
      // return res.status(HTTP_STATUS.BAD_REQUEST).json({err: err})

      if(err.status == -1){
        // let err = await 
        return ErrorHandeler.hadle(res,await ErrorHandeler.createError("detonate") )
      }
      ErrorHandeler.hadle(res, err)
    }
  }


  /**
   * @async
   */

  static async update(req, res, err) {
    const {body: { address }} = req;
    if (!address) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    try {
      const data = await addressesServices.update(address)
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
      const data = await addressesServices.delete(id)
      return res.status(HTTP_STATUS.OK).json({data, deleted: true})
    }
    catch(err) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(err)  
    }
  }
}

module.exports = addressesController;
