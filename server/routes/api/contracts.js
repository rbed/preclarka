var express = require("express");
var router = express.Router();
const contractsController = require('../../controllers/contractsController');

//   Employees API info path
router.get('/', contractsController.getAll);
router.post('/', contractsController.create);
router.put('/', contractsController.update);
router.delete('/', contractsController.removeByID);


module.exports = router;
