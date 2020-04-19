const mongoose = require("mongoose");
// const Users = mongoose.model("Users");
const usersService = require('../services/usersServices')
const HTTP_STATUS = require('http-status-codes')
const ErrorHandeler = require('../modules/ErrorHandeler/ErrorHandeler')
const AppError = require('../modules/ErrorHandeler/AppError')

const {ARGUMENT_ERROR, MONGO_ERROR} = AppError.APP_ERRORS


class usersController {
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} err
   * @returns list of users
   */
  static async getAll(req, res, err) {
    if(req.query){
      try{
        const {id, name, lastName} = req.query
        const data = await usersService.getUsers(id, name, lastName)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        ErrorHandeler.handle(req, res, err)          
      }
    }
    // try{
    //   const doc = await usersService.getUsers()
    //   return res.status(200).json(doc)
    // }catch(err){
    //   return res.status(400).json(err)
    // }
    /*
    return Users.find()
      .then(doc => {
          console.log(req.body);
        res.status(200).json({info: req.middle
          , users : doc});
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
      */
  }

  // static getByID(req, res, err) {
  //   const id = req.params.id;
  //   if (!id) {
  //     return res.status(400).send("złe id");
  //   }
  //   return Users.findOne({ _id: id })
  //     .then(doc => {
  //       res.status(200).json(doc);
  //     })
  //     .catch(err => {
  //       res.status(404).json(err);
  //     });
  // }


  /**
   * @async
   * @returns created user
   */
  static async create(req, res, err) {
    //get req data
    const {body: { user }} = req;
  
    if(!user) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales pozycjonera', ARGUMENT_ERROR)) 
    }
    try{
      const doc = await usersService.create(user)
      return res.status(200).json(doc)
    }catch(err){
      ErrorHandeler.handle(req, res, err) 
    }
   

    // var User = new Users(user);
    // //return status
    // return await User.save()
    // .then(doc => {
    //     res.status(200).json(doc);
    // })
    // .catch(err => {
    //     res.status(422).json(err);
    // });
  }


    /**
   * @async
   */
  //
  static async addMany(req, res, err) {
    const {body: { users }} = req;
    if (!users) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales userow', ARGUMENT_ERROR)) 
    }
    try {
      console.log('try');
      const data = await usersService.createMany(users)
      console.log('try2');
      return res.status(HTTP_STATUS.OK).json(data)

    } 
    catch(err) {
      console.log('jebany blad');
      ErrorHandeler.handle(req, res, err)
    }
  }


  /**
   * @async
   * @returns updated user
   */

  static async update(req, res, err) {
    const {body: { user }} = req;
    if (!user) {
      return ErrorHandeler.handle(req, res, new AppError('nie podales pozycjonera którego chcesz edytować', ARGUMENT_ERROR)) 
    }
    try {
      const doc = await usersService.update(user)
      return res.status(HTTP_STATUS.OK).json(doc)
    }
    catch(err) {
      ErrorHandeler.handle(req, res, err) 
    }

    // Users.findOneAndUpdate(
    //   { _id: user._id },
    //   user,
    //   { upsert: true },
    //   (err, doc) => {
    //     if (err) {
    //       return res.status(422).json(err);
    //     }
    //     return res.status(200).json({
    //         user: doc,
    //         message: "Updated"
    //     });
    //   }
    // );

  }

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @param {object} err
   * @returns deleted user
   * @async 
   */
  static async removeByID(req, res, err) {
    if (req.query) {
      try {
        const {id} = req.query;
        if (!id) {
          return ErrorHandeler.handle(req, res, new AppError('nie podałes id', ARGUMENT_ERROR)) 
        } else {
          const doc = await usersService.delete(id)
          res.status(HTTP_STATUS.OK).json(doc)
      }
      }
      catch(err) {
        ErrorHandeler.handle(req, res, err) 
      }
    }
    // const id = req.params.id;
    // if (!id) {
    //   return res.status(400).send("złe id");
    // }
    // return await Users.findOneAndDelete({
    //   _id: id
    // })
    //   .then(doc => {
    //     res.status(200).json(doc);
    //   })
    //   .catch(err => {
    //     res.status(422).json(err);
    //   });
  }
}

module.exports = usersController;
