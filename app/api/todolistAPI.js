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


router.route('/Todolist')
    .post(function (req, res) {
        console.log(req.body);
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

router.route('/Todolist/:Todolistname')

    .get(function (req, res) {
        Todolist.find({Todolistname:req.params.Todolistname}, function (err, Todolist) {
            if (err)
                res.send(err);
            res.json(Todolist);
        });
    })

    .put(function (req, res) {
        Todolist.find({Todolistname:req.params.Todolistname}, function (err, Todolist) {

            if (err)
                res.send(err);

            Todolist.Todolistname = req.body.Todolistname;
            Todolist.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Todolist updated!' });
            });

        });
    })

router.route('/Todolist/:id')
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