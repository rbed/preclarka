var express = require("express");
var router = express.Router();
const usersController = require('../../controllers/usersController');


//   Users API info path
router.get('/', usersController.getAll);
// router.get('/:id', usersController.getByID);
router.post('/', usersController.create);
router.put('/', usersController.update);
router.delete('/', usersController.removeByID);


module.exports = router;
