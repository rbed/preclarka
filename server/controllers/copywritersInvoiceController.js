const mongoose = require("mongoose");
const CopywritersInvoice = mongoose.model("CopywritersInvoice");

class copywritersInvoiceController {
  static getAll(req, res, err) {
    return CopywritersInvoice.find()
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
    return CopywritersInvoice.findOne({ _id: id })
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
    var Copywriter = new CopywritersInvoice(copywriter);

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
    CopywritersInvoice.findOneAndUpdate(
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
    return await CopywritersInvoice.findOneAndDelete({
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

module.exports = copywritersInvoiceController;
