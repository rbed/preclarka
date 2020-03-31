var express = require("express");
var router = express.Router();
const seosController = require('../controllers/seosController');

//   Employees API info path
router.get('/', seosController.getAll);
router.get('/:id', seosController.getByID);
router.post('/', seosController.create);
router.put('/', seosController.update);
router.delete('/:id', seosController.removeByID);


module.exports = router;
