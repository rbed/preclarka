var express = require("express");
var router = express.Router();
const ordersController = require('../../controllers/ordersController');

//   Employees API info path
router.get('/', ordersController.getAll);
// router.get('/:id', ordersController.getByID);
router.post('/', ordersController.create);
router.put('/', ordersController.update);
router.delete('/', ordersController.removeByID);


module.exports = router;
