var express = require("express");
var router = express.Router();
const contractsController = require('../../controllers/contractsController');

//   Employees API info path
router.get('/', contractsController.getAll);
router.get('/:id', contractsController.getByID);
router.post('/', contractsController.create);
router.put('/', contractsController.update);
router.delete('/:id', contractsController.removeByID);


module.exports = router;
