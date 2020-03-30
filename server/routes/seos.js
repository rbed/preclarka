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
const Seos = mongoose.model("Seos");
const CopywritersContract = mongoose.model("CopywritersContract");
const CopywritersInvoice = mongoose.model("CopywritersInvoice");



/* GET seos lsisting. */
router.get("/", async function(req, res, next) {
  try {
    var result = await Seos.find().exec();
    return res.status(200).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }
});



// Get one seo - dzial
router.get("/:id", async function(req, res, next) {
  var id = req.params.id;
  if (id) {
    try {
      var result = await Seos.find({ _id: id }).exec();
      return res.status(200).json({ info: result });

    } catch (err) {
      return res.status(500).json({ info: err });
    }
  } else {
    return res.status(500).send("nie podałeś id");
  }
});



// Dodawanie seos - 
router.post("/", async function(req, res, next) {
  // console.log(req);
  var seo = req.body.seo;
  
  if (!seo) {
    return res.status(400).send("nie moge dodać seowca");
  }
  
  try {
    var Seo = new Seos(seo);
    var result = await Seo.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  usuwanie seo - 
router.delete("/:id", async function(req, res, next) {
  // console.log(req);
  var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
  if (!id) {
    return res.status(400).send("brak id");
  }
  try {
    var result = await Seos.deleteOne({ _id: id }).exec();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

// edycja seo - 
router.put("/", async function(req, res, next) {
  // console.log(req);
  
  var seo = req.body.seo; // <<<<<<<<<<< params bo odbieram dane
  
  if (!seo) {
    return res.status(400).send("brak danych");
  }
  
  try {
    var result = await Seos.findByIdAndUpdate(seo._id, seo, doc => {
      return doc;
    });
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
    // jak chcesz aktualizować musisz przerobić na callback
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
