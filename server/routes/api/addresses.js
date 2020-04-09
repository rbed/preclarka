var express = require("express");
var router = express.Router();
const addressesController = require('../../controllers/addressesController');

//   Employees API info path
router.get('/', addressesController.getAll);
router.post('/', addressesController.create);
router.put('/', addressesController.update);
router.delete('/', addressesController.removeByID);


module.exports = router;
