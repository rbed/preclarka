var express = require("express");
var router = express.Router();
const copywritersContractController = require('../../controllers/copywritersContractController');

//   Employees API info path
router.get('/', copywritersContractController.getAll);
router.post('/', copywritersContractController.create);
router.put('/', copywritersContractController.update);
router.delete('/', copywritersContractController.removeByID);


module.exports = router;
