var createError = require('http-errors');
var express = require('express');
var path = require('path');
var chalk = require('chalk')
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const logger = require('./modules/logger/logger');



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
mongoose
   .connect('mongodb://localhost:27017/preclarkadb', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
   })
   .then(() => {
      logger.status('MongoDB connection', 'ok');
      logger.success('Successfully connected to', chalk.underline('baza danych'));
   })
   .catch((err) => {
      logger.status('MongoDB connection', 'error');
      logger.error('Connection error', 'brak polaczenia');
      console.log(err)
   });
   mongoose.set('debug', true);
   var db = mongoose.connection;

// import modeli
require('./models/Users')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);


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
