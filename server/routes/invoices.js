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
const Invoices = mongoose.model("Invoices");

/* GET Invoices lsisting.  - dziala*/
router.get("/", async function(req, res, next) {
    try {
      var result = await Invoices.find().exec();
      // FIXME: res.status(200), 500 => InternalServerError
      // return res.status(HttpStatus.OK ).json({ info: result });
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

  // Get single invoice - dziala
  router.get("/:id", async function(req, res, next) {
    
    var id = req.params.id;
    
    // pozytywny scenariusz 
    if (id) {
        try {
          var result = await Invoices.find({_id : id}).exec();
          console.log(result);
          // FIXME: res.status(200), 500 => InternalServerError
          // return res.status(HttpStatus.OK ).json({ info: result });
          return res.status(500).json({ info: result });
        } catch (err) {
          return res.status(500).json({ info: err });
        }
    }
    // FIXME:
    // if not to co?
    //return res.status(500).send('cos poszło nie tak xD')
  
  });
  
  
  // Dodawanie invoice - dziala
  router.post("/", async function(req, res, next) {
    
    var invoice = req.body.invoice;
      
    if (!invoice) {
      return res.status(400).send("cokolwiek");
    }
      
    try {
      var Invoice = new Invoices(invoice);
      console.log(invoice);
      var result = await Invoice.save();
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  // edycja invoice - dziala
  router.put("/", async function(req, res, next) {
    // console.log(req);
    var invoice = req.body.invoice; // <<<<<<<<<<< params bo odbieram dane
    
      if (!invoice) {
      return res.status(402).send("brak danych");
    }
      
    try {
      var result = await Invoices.findByIdAndUpdate(invoice._id, invoice, doc => {
        return doc;
      });
      console.log(result);
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
      // jak chcesz aktualizować musisz przerobić na callback
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  
  //  usuwanie invoice - dziala
  router.delete("/:id", async function(req, res, next) {
    // console.log(req);
    
    var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
    
    if (!id) {
      return res.status(402).send("brak id");
    }
      
    try {
      var result = await Invoices.deleteOne({ _id: id }).exec();
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });



// TODO: przykład todo

module.exports = router;
