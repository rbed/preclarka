var express = require("express");
var router = express.Router();
const copywritersContractController = require('../../controllers/copywritersContractController');
const registrationController = require('../../controllers/RegistrationController')

//   Employees API info path
router.get('/', copywritersContractController.getAll);
router.post('/', copywritersContractController.create);
router.put('/', copywritersContractController.update);
router.delete('/', copywritersContractController.removeByID);
router.post('/register', registrationController.registrationContract);

module.exports = router;
