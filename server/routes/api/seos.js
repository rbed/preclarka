var express = require("express");
var router = express.Router();
const seosController = require('../../controllers/seosController');

//   Seos API info path
router.get('/', seosController.getAll);
// router.get('/:id', seosController.getByID);
router.post('/', seosController.create);
router.put('/', seosController.update);
router.delete('/', seosController.removeByID);


module.exports = router;
