var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Articles = mongoose.model("Articles");

/* GET Articles lsisting.  - dziala*/
router.get("/", async function(req, res, next) {
    try {
      var result = await Articles.find().exec();
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
  
  // Get single article 
  router.get("/:id", async function(req, res, next) {
    var id = req.params.id;
    if (id) {
    try {
      var result = await Articles.find({_id : id}).exec();
      console.log(result);
      return res.status(500).json({ info: result });
    } catch (err) {
      return res.status(500).json({ info: err });
    }}
  
  });
  
  
  // Dodawanie artykułów - działa
  router.post("/", async function(req, res, next) {
    var article = req.body.article;
    if (!article) {
      return res.status(402).send("cokolwiek");
    }
    try {
      var Article = new Articles(article);
      console.log(article);
      var result = await Article.save();
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  
  // edycja artykułu - dziala
  router.put("/", async function(req, res, next) {
    // console.log(req);
    var article = req.body.article; // <<<<<<<<<<< params bo odbieram dane
    if (!article) {
      return res.status(402).send("brak danych");
    }
    try {
      var result = await Articles.findByIdAndUpdate(article._id, article, doc => {
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
  
  
  
  //  usuwanie artykułów - dziala
  router.delete("/:id", async function(req, res, next) {
    // console.log(req);
    var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
    if (!id) {
      return res.status(402).send("brak id");
    }
    try {
      var result = await Articles.deleteOne({ _id: id }).exec();
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });



// TODO: przykład todo

module.exports = router;
