var express = require("express");
var router = express.Router();
const copywritersInvoiceController = require('../../controllers/copywritersInvoiceController');

//   Employees API info path
router.get('/', copywritersInvoiceController.getAll);
router.post('/', copywritersInvoiceController.create);
router.put('/', copywritersInvoiceController.update);
router.delete('/', copywritersInvoiceController.removeByID);


module.exports = router;
