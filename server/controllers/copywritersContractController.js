const mongoose = require("mongoose");
const CopywritersContract = mongoose.model("CopywritersContract");

class copywritersContractController {
  static getAll(req, res, err) {
    return CopywritersContract.find()
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
    return CopywritersContract.findOne({ _id: id })
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
      body: { copywriter }
    } = req;

    //save adres
    var Copywriter = new CopywritersContract(copywriter);

    //return status
    return await Copywriter.save()
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
      body: { copywriter }
    } = req;
    if (!copywriter) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    console.log(copywriter);
    CopywritersContract.findOneAndUpdate(
      { _id: copywriter._id },
      copywriter,
      { upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json({
            copywriter: doc,
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
    return await CopywritersContract.findOneAndDelete({
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

module.exports = copywritersContractController;
