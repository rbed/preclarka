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
const Users = mongoose.model("Users");
const Seos = mongoose.model("Seos");
const CopywritersContract = mongoose.model("CopywritersContract");
const CopywritersInvoice = mongoose.model("CopywritersInvoice");



/* GET users lsisting. */
router.get("/", async function(req, res, next) {
  try {
    return res.status(200).json({ info: result });
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



// Get one user
router.get("/:id", async function(req, res, next) {
  
  var id = req.params.id;
  
  // co jesli nie dostaniemy ID? serwer nawet nie posypie nam błędem :)
  if (id) {
    try {
      var result = await Users.find({ _id: id }).exec();
      return res.status(200).json({ info: result });
    } catch (err) {
      return res.status(500).json({ info: err });
    }
  } else {
    return res.status(500).send("nie podałeś id");
  }
});

// TODO: tu funkcjonalność gryzie się z tą powyższą
// Get list of users, depends of type
router.get("/:type", async function(req, res, next) {
  var type = req.params.type
  if (!type) {
    return res.status(200).send('nie podałes typu');
  }  
  if (req.params.type === "seos") {
    var result = await Seos.find().exec();
    return res.status(200).json({ info: result });
    // req.query.id
  } 
  if (req.params.type === "copywiters-u") {
    var result = await CopywritersContract.find().exec();
    if(result) {
    return res.status(200).json({ info: result });
    } else {
      console.log('chuj'); // :D
    }
  }
  if (req.params.type === "copywiters-fv") {
    var result = await CopywritersInvoice.find().exec();
    return res.status(200).json({ info: result });
  }
 
});


// Dodawanie uzytkownikow - 
router.post("/", async function(req, res, next) {
  // console.log(req);
  var user = req.body.user;
  
  if (!user) {
    return res.status(400).send("nie moge dodać usera");
  }
  
  try {
    var User = new Users(user);
    var result = await User.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  usuwanie usera - 
router.delete("/:id", async function(req, res, next) {
  // console.log(req);
  var id = req.params.id; // 
  
  if (!id) {
    return res.status(400).send("brak id");
  }
  
  try {
    var result = await Users.deleteOne({ _id: id }).exec();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});


// edycja usera - 
router.put("/", async function(req, res, next) {
  // console.log(req);
  var user = req.body.user; // <<<<<<<<<<< params bo odbieram dane
  
  if (!user) {
    return res.status(400).send("brak danych");
  }
  
  try {
    var result = await Users.findByIdAndUpdate(user._id, user, doc => {
      return doc;
    });
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
    // jak chcesz aktualizować musisz przerobić na callback
  } catch (err) {
    res.status(400).json(err);
  }
});


// TODO: przykład todo

module.exports = router;
