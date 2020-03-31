var express = require("express");
var router = express.Router();
const articlesController = require('../controllers/articlesController')

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.getByID);
router.post('/', articlesController.create);
router.put('/', articlesController.update);
router.delete('/:id', articlesController.removeByID);




module.exports = router;
