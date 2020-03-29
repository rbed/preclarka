var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");
const Orders = mongoose.model("Orders");

/* GET orders lsisting - dziala */
router.get("/", async function(req, res, next) {
  try {
    var result = await Orders.find().exec();
    return res.status(500).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }

});


// get single order - dziala
router.get("/:id", async function(req, res, next) {
  const id = req.params.id  
  try {
    var result = await Orders.findOne({_id : id}).exec();
    return res.status(200).json({ info: result });
  } catch (err) {
    return res.status(500).json({ info: err });
  }
});


// Dodawanie uzytkownikow - dziala
router.post("/", async function(req, res, next) {
  // console.log(req);
  var order = req.body.order;
  if (!order) {
    return res.status(402).send("brak treści zamowienia");
  }
  try {
    var Order = new Orders(order);
    console.log(Order);
    var result = await Order.save();
    console.log(res.status(200).json(result));
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
});


// edycja zamowienia - dziala
router.put("/", async function(req, res, next) {
    // console.log(req);
    var order = req.body.order; // <<<<<<<<<<< params bo odbieram dane
    if (!order) {
      return res.status(402).send("brak danych");
    }
    try {
      var result = await Orders.findByIdAndUpdate(order._id, order, doc => {
        return doc;
      });
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
      // jak chcesz aktualizować musisz przerobić na callback
    } catch (err) {
      res.status(400).json(err);
    }
  });


  //  usuwanie zamowienia - dziala
router.delete("/:id", async function(req, res, next) {
    // console.log(req);
    var id = req.params.id; // <<<<<<<<<<< params bo odbieram dane
    if (!id) {
      return res.status(402).send("brak id");
    }
    try {
      var result = await Orders.deleteOne({ _id: id }).exec();
      console.log(res.status(200).json(result));
      return res.status(200).json(result);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// TODO: przykład todo

module.exports = router;
