const cors = require('cors')
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
const classes = require('./routes/class')
const category = require('./routes/category')
const donation = require('./routes/donation')

const mongoose = require(`mongoose`)

var app = express();

const db = mongoose.connection
const url = `mongodb+srv://mulaibelajar:mulaibelajar@mulaibelajar-e4ojd.mongodb.net/mulaibelajar`
const successMessage = `You're connected to MongoDB`
const errorMessage = `Connection error : `

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api/class', classes)
app.use('/api/category', category)
app.use('/api/donation', donation)

mongoose.connect(url);
db.on(`error`, console.log.bind(console, errorMessage));
db.once(`open`, () => {
 console.log(successMessage);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
