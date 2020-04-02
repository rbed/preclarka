/*
* TODO:
*   - przesunąć routing logiki biznesowej do API
*
* wszystkie paczki API powrzucaj tutaj
* dzieki temu bedziesz mial jedna nadrzedna sciezke API do zarządzenia
* cos w rodzaju dodatkowego routera :) 
*/
var express = require("express");
var router = express.Router();

//   Employees API info path

var usersRouter = require('./users');
var addressesRouter = require('./addresses');
var ordersRouter = require('./orders');
var articlesRouter = require('./articles');
var contractsRouter = require('./contracts');
var copywritersCRouter = require('./copywritersContract');
var copywritersIRouter = require('./copywritersInvoice');
var invoicesRouter = require('./invoices');
var seosRouter = require('./seos');

router.use('/users', usersRouter);
router.use('/addresses', addressesRouter);
router.use('/orders', ordersRouter);
router.use('/articles', articlesRouter);
router.use('/contracts', contractsRouter);
router.use('/copywriters-contract', copywritersCRouter);
router.use('/copywriters-invoice', copywritersIRouter);
router.use('/invoices', invoicesRouter);
router.use('/seos', seosRouter);


module.exports = router;
