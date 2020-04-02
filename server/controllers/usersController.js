const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const usersService = require('../services/usersServices')
const HTTP_STATUS = require('http-status-codes')

class usersController {
  static async getAll(req, res, err) {
    if(req.query){
      try{
        const {name, lastName, id} = req.query
        const data = await usersService.getUsers(name, lastName, id)
        return res.status(HTTP_STATUS.OK).json(data)
      }catch(err){
        return  res.status(400).json(err)          
      }
    }

    try{
      const doc = await usersService.getUsers()
      return res.status(200).json(doc)
    }catch(err){
      return res.status(400).json(err)
    }
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
   */
  //
  static async create(req, res, err) {
    //get req data
    const {body: { user }} = req;
    
    if(!user) {
      return res.status(400).send('nie podales uzytkowika ktorego chcesz stworzyc')
    }
    try{
      const doc = await usersService.createUser(user)
      return res.status(200).json(doc)
    }catch(err){
      return res.status(400).json(err)
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
   *
   * @async
   */

  static async update(req, res, err) {
    const {body: { user }} = req;
    if (!user) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    console.log(user);
    Users.findOneAndUpdate(
      { _id: user._id },
      user,
      { upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json({
            user: doc,
            message: "Updated"
        });
      }
    );
  }

  static async removeByID(req, res, err) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("złe id");
    }
    return await Users.findOneAndDelete({
      _id: id
    })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  }
}

module.exports = usersController;
