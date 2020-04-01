const mongoose = require("mongoose");
const Users = mongoose.model("Users");

class usersController {
  static getAll(req, res, err) {
    return Users.find()
      .then(doc => {
          console.log();
        res.status(200).json(doc);
      })
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  }

  static getByID(req, res, err) {
    const id = req.params.id;
    if (!id) {
      return res.status(400).send("złe id");
    }
    return Users.findOne({ _id: id })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }

  /**
   * @async
   */
  //
  static async create(req, res, err) {
    //get req data
    const {
      body: { user }
    } = req;

    //save adres
    var User = new Users(user);

    //return status
    return await User.save()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(422).json(err);
      });
  }

  /**
   *
   * @async
   */

  static async update(req, res, err) {
    const {
      body: { user }
    } = req;
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
