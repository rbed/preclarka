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
const CopywritersContract = mongoose.model("CopywritersContract");

/* GET CopywritersContract lsisting. - dziala*/
router.get("/", async function(req, res, next) {
  try {
    var result = await CopywritersContract.find().exec();
    // FIXME: res.status(200), 500 => InternalServerError
    // return res.status(HttpStatus.OK ).json({ info: result });
    return res.status(500).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }

});


// Get single copywriter 
router.get("/:id", async function(req, res, next) {
  var id = req.params.id;
  
  console.log(id);
  
  //pozytywny scenariusz
  if (id) {
    try {
      var result = await CopywritersContract.find({_id : id}).exec();
      console.log(result);
      return res.status(200).json({ info: result });
    } catch (err) {
      return res.status(500).json({ info: err });
    }
  }
  // FIXME:
  // if not to co?
  //return res.status(500).send('cos poszło nie tak xD')

});


// Dodawanie copywriterow
router.post("/", async function(req, res, next) {
  var copywriter = req.body.copywriter;
  
  if (!copywriter) {
    return res.status(400).send("cokolwiek");
  }
  
  try {
    var Copywriter = new CopywritersContract(copywriter);
    console.log(copywriter);
    var result = await Copywriter.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});


// edycja copywritera - dziala
router.put("/", async function(req, res, next) {
  // console.log(req);
  var copywriter = req.body.copywriter; // <<<<<<<<<<< params bo odbieram dane
  
  if (!copywriter) {
    return res.status(400).send("brak danych");
  }
  try {
    var result = await CopywritersContract.findByIdAndUpdate(copywriter._id, copywriter, doc => {
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
    return res.status(402).send("brak id");
  }
  
  try {
    var result = await CopywritersContract.deleteOne({ _id: id }).exec();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});



// TODO: przykład todo

module.exports = router;
