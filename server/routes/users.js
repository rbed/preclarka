var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Users = mongoose.model("Users");

/* GET users lsisting. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/all', function(req, res, next) {

  var result = Users.find().exec()
  
  res.status(200).json({info :result})
})

router.post('/',function(req,res,next){
  var user = req.body.user

  var User = new Users(user).save()
  res.status(200).send("created")
})

module.exports = router;
