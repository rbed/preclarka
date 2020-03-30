const mongoose = require('mongoose');
const Addresses = mongoose.model('Addresses');

class addressesController {
    static getAll(req, res, err) {
        return Addresses.find()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json(err)
        })
    }


     static getByID(req, res, err) {
        return Addresses.findOne({ _id: req.params.id })
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
       body: { address }
    } = req;

    //save adres
    var Address = new Addresses(address);

    //return status
    return await Address.save()
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
       body: { address }
    } = req;
    console.log(address);
    Addresses.findOneAndUpdate(
       { _id: address._id },
       address,
       { upsert: true },
       (err, doc) => {
          if (err) {
             return res.status(422).json(err);
          }
          return res.status(200).json({
             adsres: doc,
             message: 'Updated'
          });
       }
    );
    }


    static async removeByID(req, res, err) {
        return await Addresses.findOneAndDelete({
        _id: req.params.id
        })
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(422).json(err);
        });
    }
     
}


module.exports = addressesController;