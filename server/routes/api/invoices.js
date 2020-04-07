var express = require("express");
var router = express.Router();
const invoicesController = require('../../controllers/invoicesController');

//   Employees API info path
router.get('/', invoicesController.getAll);
// router.get('/:id', invoicesController.getByID);
router.post('/', invoicesController.create);
router.put('/', invoicesController.update);
router.delete('/', invoicesController.removeByID);


module.exports = router;
