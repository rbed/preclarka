var express = require("express");
var router = express.Router();
const articlesController = require('../../controllers/articlesController')

router.get('/', articlesController.getAll);
router.post('/', articlesController.create);
router.put('/', articlesController.update);
router.delete('/', articlesController.removeByID);




module.exports = router;
