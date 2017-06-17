var Diary = require('../models/Diary');
var express = require('express');
var router = express.Router();

var app = express();
// configure body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// middleware to use for all requests
router.use(function (req, res, next) {
    console.log('Something is happening.');
    next();
});


router.route('/diary')
    .post(function (req, res) {
        var diary = new Diary(req.body);
        diary.save(function (err) {
            if (err)
                res.send(err);
            res.json({ message: 'Diary created!' });
        });
    })

router.route('/diary/:id')
    .get(function (req, res) {
        Diary.findById(req.params.id, function (err, diary) {
            if (err)
                res.send(err);
            res.json(diary);
        });
    })
    .put(function (req, res) {
        Diary.findById(req.params.id, function (err, diary) {
            if (err)
                res.send(err);
            diary.id = req.body.id;

            // 待定

            diary.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Diary updated!' });
            });
        });
    })

router.route('/diary/:id')
    .delete(function (req, res) {
        Diary.remove({
            _id: req.params.id
        }, function (err, diary) {
            if (err)
                res.send(err);
            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;