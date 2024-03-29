var createError = require('http-errors');
const express = require('express');
const cors = require('cors');
var path = require('path');
var session = require('express-session');

var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('./config/mongoose');

var db = mongoose();


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin.routes');
var studentRouter = require('./routes/student.routes');

var app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors({ 
  origin: 'http://localhost:3000',  // Allow requests from your frontend
  credentials: true,  // Allow credentials (cookies)
}));
//
//handle the use of PUT or DELETE methods
//override with POST having ?_method=DELETE or
// ?_method=PUT
//saveUninitialized - orces a session that is "uninitialized" to be saved to the store
//resave - forces the session to be saved back to the session store
// Configure the 'session' middleware
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "developmentSessionSecret"
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/student', studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
