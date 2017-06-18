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
        User.findOne({ name: req.body.name }, function (err, user) {
            if (user === null) res.json({ code: 3, msg: 'wrong username' });
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err)
                    res.json({ code: 2, msg: 'db err', err: err });
                if (!isMatch) {
                    res.json({ code: 1, msg: 'wrong password' });
                } else {
                    req.session.username = req.body.name;
                    res.json({ code: 0, msg: 'login!' });
                }
            })
        })
    })

router.route('/register')
    .post(function (req, res) {
        var user = new User(req.body);
        user.save(function (err) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'User created!' });
        });

    });

module.exports = router;