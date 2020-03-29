var express = require("express");
var router = express.Router();

/**
* obsługa błędów HTTP zewnetrzna biblioteką
*  -- pakiet opcjonalny ale moze będzie Ci łatwiej pracowac
*  -- dokumentacja biblioteki
*    -- https://www.npmjs.com/package/http-status-codes
*/
//var HttpStatus = require('http-status-codes');

const mongoose = require("mongoose");
const Addresses = mongoose.model("Addresses");

/* GET addresses lsisting. */
router.get("/", async function(req, res, next) {
  try {
    var result = await Addresses.find().exec();
    // FIXME: res.status(200), 500 => InternalServerError
    // return res.status(HttpStatus.OK ).json({ info: result });
    return res.status(500).json({ info: result });
  } catch (err) {
    // return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ info: result });
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
// Get single address 
router.get("/:id", async function(req, res, next) {
  var id = req.params.id;
  if (id) {
  try {
    var result = await Addresses.find({id : id}).exec();
    console.log(result);
    // FIXME: res.status(200), 500 => InternalServerError
    // return res.status(HttpStatus.OK ).json({ info: result });
    return res.status(500).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }}

});


// Dodawanie adresów
router.post("/", async function(req, res, next) {
  var address = req.body.address;
  if (!address) {
    return res.status(402).send("cokolwiek");
  }
  try {
    var Address = new Addresses(address);
    console.log(Address);
    var result = await Address.save();
    //console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});


// edycja adresu - dziala
router.put("/", async function(req, res, next) {
  // console.log(req);
  var address = req.body.address; // <<<<<<<<<<< params bo odbieram dane
  if (!address) {
    //res.status(HttpStatus.BAD_REQUEST).send("brak danych");
    return res.status(400).send("brak danych");
  }
  try {
    var result = await Addresses.findByIdAndUpdate(address._id, address, doc => {
      return doc;
    });
    //console.log(res.status(200).json(result));
    return res.status(200).json(result);
    // jak chcesz aktualizować musisz przerobić na callback
  } catch (err) {
    res.status(400).json(err);
  }
});



//  usuwanie adresu - dziala
router.delete("/:id", async function(req, res, next) {
  // console.log(req);
  var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
  if (!id) {
    return res.status(400).send("brak id");
  }
  try {
    var result = await Addresses.deleteOne({ _id: id }).exec();
    //console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});



// TODO: przykład todo

module.exports = router;
