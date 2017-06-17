var Folder = require('../models/Folder');

var express = require('express');

var router = express.Router();

var app = express();

var session = require('express-session');
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'bugaosuni'
}));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/folder')
    .post(function (req, res) {
        console.log(req.body);
        var folder = new Folder(req.body);
        folder.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Folder created!' });
        });
    })

    .get(function (req, res) {
        console.log(req.session.username)
        Folder.find({username:req.session.username},function (err, folder) {
            if (err)
                res.send(err);
            res.json(folder);
        });
    });

router.route('/folder/:id')
    .put(function (req, res) {
        Folder.find({_id:req.params.id}, function (err, folder) {
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