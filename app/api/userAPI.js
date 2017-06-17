var User = require('../models/User');
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


router.route('/login')
    .post(function (req, res) {
        console.log(req.body);
        User.findOne({ name: req.body.name }, function (err, user) {
            console.log(user);
            user.comparePassword(req.body.password, function (err, pass) {
                if(err)
                    res.send(err);
                req.session.username = req.body.name;
                res.json({ message: 'login!' });
            })
        })
    })

router.route('/register')
    .post(function (req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'User created!' });
        });

    });

router.route('/user/:username')

    .get(function (req, res) {
        User.find({ Username: req.params.username }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })

    .put(function (req, res) {
        User.find({ Username: req.params.username }, function (err, user) {

            if (err)
                res.send(err);

            User.Username = req.body.Username;
            User.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })

router.route('/user/:id')
    .delete(function (req, res) {
        User.remove({
            _id: req.params.id
        }, function (err, User) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;