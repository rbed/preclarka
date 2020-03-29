var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Contracts = mongoose.model("Contracts");

/* GET Contracts lsisting. - dziala */
router.get("/", async function(req, res, next) {
  try {
    var result = await Contracts.find().exec();
    return res.status(500).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }

  /*
  Users
  .find()
  .exec()
  .then(doc =>{
    res.status(200).json({info :doc})
  })
  .catch(err=>{
    res.status(500).json({info :err})
  })
  */
});

//nie działa pobieranie pojedynczego adres
// Get single contract 
router.get("/:id", async function(req, res, next) {
    var id = req.params.id;
    if (id) {
      try {
        var result = await Contracts.find({ _id: id }).exec();
        return res.status(500).json({ info: result });
      } catch (err) {
        return res.status(500).json({ info: err });
      }
    }
  });


// Dodawanie contracts - działa
router.post("/", async function(req, res, next) {
  var contract = req.body.contract;
  if (!contract) {
    return res.status(402).send("cokolwiek");
  }
  try {
    var Contract = new Contracts(contract);
    var result = await Contract.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});


// edycja contracts - dziala
router.put("/", async function(req, res, next) {
  // console.log(req);
  var contract = req.body.contract; // <<<<<<<<<<< params bo odbieram dane
//   console.log(contract);
  if (!contract) {
    return res.status(402).send("brak danych");
  }
  try {
    var result = await Contracts.findByIdAndUpdate(contract._id, contract, doc => {
      return doc;
    });
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
    // jak chcesz aktualizować musisz przerobić na callback
  } catch (err) {
    res.status(400).json(err);
  }
});



//  usuwanie contracts - dziala
router.delete("/:id", async function(req, res, next) {
  // console.log(req);
  var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
  if (!id) {
    return res.status(402).send("brak id");
  }
  try {
    var result = await Contracts.deleteOne({ _id: id }).exec();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});



// TODO: przykład todo

module.exports = router;
