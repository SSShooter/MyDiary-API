// BASE SETUP
// =============================================================================

// call the packages we need

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/mydiary');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

var folderAPI = require('./app/api/folderAPI.js');
var diaryAPI = require('./app/api/diaryAPI.js');
var phonebookAPI = require('./app/api/phonebookAPI.js');
var todolistAPI = require('./app/api/todolistAPI.js');
var userAPI = require('./app/api/userAPI.js');

var session = require('express-session');
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'bugaosuni'
}));

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port



// REGISTER OUR ROUTES -------------------------------
app.use('/api', folderAPI);
app.use('/api', diaryAPI);
app.use('/api', phonebookAPI);
app.use('/api', todolistAPI);
app.use('/api', userAPI);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
