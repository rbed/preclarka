var express = require("express");
var router = express.Router();
const copywritersContractController = require('../controllers/copywritersContractController');

//   Employees API info path
router.get('/', copywritersContractController.getAll);
router.get('/:id', copywritersContractController.getByID);
router.post('/', copywritersContractController.create);
router.put('/', copywritersContractController.update);
router.delete('/:id', copywritersContractController.removeByID);


module.exports = router;
