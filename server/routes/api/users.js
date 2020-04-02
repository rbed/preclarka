var express = require("express");
var router = express.Router();
const usersController = require('../../controllers/usersController');


//   Employees API info path
router.get('/', usersController.getAll);
// router.get('/:id', usersController.getByID);
router.post('/', usersController.create);
router.put('/', usersController.update);
router.delete('/:id', usersController.removeByID);


module.exports = router;
