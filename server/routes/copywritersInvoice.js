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
const CopywritersInvoice = mongoose.model("CopywritersInvoice");

/* GET CopywritersInvoice lsisting. - dziala*/
router.get("/", async function(req, res, next) {
  try {
    var result = await CopywritersInvoice.find().exec();
    return res.status(200).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }

});


// Get single copywriter - dziala
router.get("/:id", async function(req, res, next) {
 
  var id = req.params.id;
  
  //rozpatrujesz tylko pozytywny scenariusz zapytania
  if (id) {
    try {
      var result = await CopywritersInvoice.find({_id : id}).exec();
      console.log(result);
      return res.status(200).json({ info: result });
    } catch (err) {
      return res.status(500).json({ info: err });
    }
  }
  // if not to co?
  //return res.status(500).send('cos poszło nie tak xD')

});


// Dodawanie copywriterow - dziala
router.post("/", async function(req, res, next) {
  var copywriter = req.body.copywriter;
  
  console.log(copywriter);
 
  if (!copywriter) {
    return res.status(400).send("cokolwiek");
  }
  
  try {
    var copywriter = new CopywritersInvoice(copywriter);
    console.log(copywriter);
    var result = await copywriter.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
  
});


// edycja copywritera - dziala
router.put("/", async function(req, res, next) {
  // console.log(req);
  var copywriter = req.body.copywriter; // << params bo odbieram dane
  
  if (!copywriter) {
    return res.status(400).send("brak danych");
  }
  
  try {
    var result = await CopywritersInvoice.findByIdAndUpdate(copywriter._id, copywriter, doc => {
      return doc;
    });
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
    // jak chcesz aktualizować musisz przerobić na callback
  } catch (err) {
    res.status(400).json(err);
  }
  
});



//  usuwanie copywritera - dziala
router.delete("/:id", async function(req, res, next) {
  // console.log(req);
  var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
  
  if (!id) {
    return res.status(400).send("brak id");
  }
  
  try {
    var result = await CopywritersInvoice.deleteOne({ _id: id }).exec();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});



// TODO: przykład todo

module.exports = router;
