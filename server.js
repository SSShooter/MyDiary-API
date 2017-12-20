// BASE SETUP
// =============================================================================

// call the packages we need

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mydiary')
mongoose.Promise = global.Promise
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var morgan = require('morgan')

var folderAPI = require('./app/api/folderAPI.js')
var diaryAPI = require('./app/api/diaryAPI.js')
var phonebookAPI = require('./app/api/phonebookAPI.js')
var todolistAPI = require('./app/api/todolistAPI.js')
var userAPI = require('./app/api/userAPI.js')

var session = require('express-session')
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'bugaosuni'
}))

// configure app
app.use(morgan('dev')) // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

var port = process.env.PORT || 8090 // set our port

// 允许跨域
app.use('/api', function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', 'true')
  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.header('Access-Control-Allow-Origin', 'http://192.168.0.144:8080')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
app.use(express.static('public'))
// REGISTER OUR ROUTES -------------------------------
app.use('/api', userAPI)

// 必须登陆
app.use(function (req, res, next) {
  console.log(req.session.username, req.session.id)
  if (req.session.username) next()
  else {
    res.json({
      code: 11,
      msg: 'not login'
    })
  }
})

app.use('/api', folderAPI)
app.use('/api', diaryAPI)
app.use('/api', phonebookAPI)
app.use('/api', todolistAPI)
// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Magic happens on port ' + port)
