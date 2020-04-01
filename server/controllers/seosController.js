const mongoose = require("mongoose");
const Seos = mongoose.model("Seos");

class seosController {
  static getAll(req, res, err) {
    return Seos.find()
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
    return Seos.findOne({ _id: id })
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
      body: { seo }
    } = req;

    //save adres
    var Seo = new Seos(seo);

    //return status
    return await Seo.save()
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
      body: { seo }
    } = req;
    if (!seo) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    console.log(seo);
    Seos.findOneAndUpdate(
      { _id: seo._id },
      seo,
      { upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json({
            seo: doc,
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
    return await Seos.findOneAndDelete({
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

module.exports = seosController;
