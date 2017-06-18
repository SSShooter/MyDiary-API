var Todolist = require('../models/Todolist');
var express = require('express');
var router = express.Router();

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('Something is happening in todolistAPI.js');
    next();
});


router.route('/todolist')
    .post(function (req, res) {
        var Todolist = new Todolist(req.body);
        Todolist.save(function (err) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item created!' });
        });
    })

router.route('/todolist/:id')
    .put(function (req, res) {
        Todolist.findById(req.params.id, function (err, Todolist) {
            if (err)
                res.json({ code: 2, msg: 'can\'t find', err: err });
            Todolist.content = req.body.content;
            Todolist.state = req.body.state;
            Todolist.save(function (err) {
                if (err)
                    res.json({ code: 1, msg: 'save err', err: err });
                res.json({ code: 0, msg: 'item Update!' });
            });
        });
    })
    .delete(function (req, res) {
        Todolist.remove({
            _id: req.params.id
        }, function (err, Todolist) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item Delete!' });
        });
    });

module.exports = router;