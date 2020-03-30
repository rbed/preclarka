var express = require("express");
var router = express.Router();
const addressesController = require('../controllers/addressesController');

//   Employees API info path
router.get('/', addressesController.getAll);
router.get('/id/:id', addressesController.getByID);
router.post('/', addressesController.create);
router.put('/', addressesController.update);
router.delete('/:id', addressesController.removeByID);


module.exports = router;
