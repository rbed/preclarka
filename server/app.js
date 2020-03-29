var createError = require('http-errors');
var express = require('express');
var path = require('path');
var chalk = require('chalk')
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('./modules/logger/logger');
const config = require('./config/config')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 *    Database access initiation
 */
const dbPath = config.LOCAL_DB_PATH //'mongodb://localhost:27017/preclarkadb'

mongoose
   .connect(dbPath, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      logger.status('MongoDB connection', 'ok');
      logger.success('Successfully connected to', chalk.underline(dbPath));
   })
   .catch((err) => {
      logger.status('MongoDB connection', 'error');
      logger.error('Connection error', dbPath);
      console.log(err)
   });
   mongoose.set('debug', true);
   var db = mongoose.connection;

// import modeli
require('./models/Users')
require('./models/Seos')
require('./models/CopywritersContract')
require('./models/CopywritersInvoice')
require('./models/Addresses')
require('./models/Orders')
require('./models/Articles')
require('./models/Contracts')
require('./models/Invoices')


var indexRouter = require('./routes/index');
/*
* Wszystkie sciezki ponizej powinny pojsc do ./routes/api/... 
* Dla zachowania porządku w kodzieka obsługująca API powinna być zaimplementowana jako nadrzędna, obsługująca reszte funkcjonalności
*/
// app.use('/API', require('./routes/api/')) // tyle wystarczy, jeśli nic nie robimy ze zmiennymi Routingu to nie ma potrzeby ich pobierac do zmiennej ;)
var usersRouter = require('./routes/users');
var addressesRouter = require('./routes/addresses');
var ordersRouter = require('./routes/orders');
var articlesRouter = require('./routes/articles');
var contractsRouter = require('./routes/contracts');
var copywritersCRouter = require('./routes/copywritersContract');
var copywritersIRouter = require('./routes/copywritersInvoice');
var invoicesRouter = require('./routes/invoices');
var seosRouter = require('./routes/seos');


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/addresses', addressesRouter);
app.use('/orders', ordersRouter);
app.use('/articles', articlesRouter);
app.use('/contracts', contractsRouter);
app.use('/copywriters-contract', copywritersCRouter);
app.use('/copywriters-invoice', copywritersIRouter);
app.use('/invoices', invoicesRouter);
app.use('/seos', seosRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
