const mongoose = require("mongoose");
const Contracts = mongoose.model("Contracts");

class contractsController {
  static getAll(req, res, err) {
    return Contracts.find()
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
    return Contracts.findOne({ _id: id })
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
      body: { contract }
    } = req;

    //save adres
    var Contract = new Contracts(contract);

    //return status
    return await Contract.save()
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
      body: { contract }
    } = req;
    if (!contract) {
        return res.status(400).send('nie podałeś co chcesz zmmienic')
    }
    console.log(contract);
    Contracts.findOneAndUpdate(
      { _id: contract._id },
      contract,
      { upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json({
            contract: doc,
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
    return await Contracts.findOneAndDelete({
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

module.exports = contractsController;
