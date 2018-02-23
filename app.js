require("dotenv").config()

const cors = require("cors")
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const user = require('./routes/user')
const admin = require('./routes/admin')
const classes = require('./routes/class')
//const donation = require('./routes/donation')

const mongoose = require(`mongoose`)

const app = express()

const db = mongoose.connection
const url = `mongodb://localhost/mulaibelajar`
const successMessage = `You're connected to MongoDB`
const errorMessage = `Connection error : `

// view engine setup

app.use(cors())
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public', 'favicon.ico')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser())

app.use('/admin', admin)
app.use('/user', user)
app.use('/class', classes)
//app.use('/donation', donation)

mongoose.connect(url);
db.on(`error`, console.log.bind(console, errorMessage));
db.once(`open`, () => {
 console.log(successMessage);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err)
})

module.exports = app
