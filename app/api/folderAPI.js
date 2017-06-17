var Folder = require('../models/Folder');

// ROUTES FOR OUR API
// =============================================================================

var express = require('express');
// create our router
var router = express.Router();

var app = express();

var session = require('express-session');
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'bugaosuni'
}));

// configure body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /folder
// ----------------------------------------------------
router.route('/folder')

    // create a folder (accessed at POST http://localhost:8080/folder)
    .post(function (req, res) {
        console.log(req.body);
        var folder = new Folder(req.body);		// create a new instance of the Folder model

        folder.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Folder created!' });
        });


    })

    // get all the folder (accessed at GET http://localhost:8080/api/folder)
    .get(function (req, res) {
        console.log(req.session.username)
        Folder.find({username:req.session.username},function (err, folder) {
            if (err)
                res.send(err);

            res.json(folder);
        });
    });

// on routes that end in /folder/:foldername
// ----------------------------------------------------
router.route('/folder/:foldername')

    // get the folder with that id
    .get(function (req, res) {
        Folder.find({foldername:req.params.foldername}, function (err, folder) {
            if (err)
                res.send(err);
            res.json(folder);
        });
    })

    // update the folder with this id
    .put(function (req, res) {
        Folder.find({foldername:req.params.foldername}, function (err, folder) {

            if (err)
                res.send(err);

            folder.foldername = req.body.foldername;
            folder.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Folder updated!' });
            });

        });
    })

router.route('/folder/:id')
    // delete the folder with this id
    .delete(function (req, res) {
        Folder.remove({
            _id: req.params.id
        }, function (err, folder) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;