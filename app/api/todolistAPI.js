var Todolist = require('../models/Todolist');
var express = require('express');
var router = express.Router();

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});


router.route('/todolist')
    .post(function (req, res) {
        var Todolist = new Todolist(req.body);
        Todolist.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Todolist created!' });
        });
    })
    .get(function (req, res) {
        Todolist.find(function (err, Todolist) {
            if (err)
                res.send(err);

            res.json(Todolist);
        });
    });

router.route('/todolist/:id')
    .get(function (req, res) {
        Todolist.findById(req.params.id, function (err, Todolist) {
            if (err)
                res.send(err);
            res.json(Todolist);
        });
    })
    .put(function (req, res) {
        Todolist.findById(req.params.id, function (err, Todolist) {
            if (err)
                res.send(err);
            Todolist.id = req.body.id;
            Todolist.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Todolist updated!' });
            });
        });
    })
    .delete(function (req, res) {
        Todolist.remove({
            _id: req.params.id
        }, function (err, Todolist) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;