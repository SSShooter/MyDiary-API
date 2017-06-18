var Diary = require('../models/Diary');
var express = require('express');
var router = express.Router();

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('Something is happening in diaryAPI.js');
    next();
});


router.route('/diary')
    .post(function (req, res) {
        var diary = new Diary(req.body);
        diary.save(function (err) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item created!' });
        });
    })

router.route('/diary/:id')
    .put(function (req, res) {
        Diary.findById(req.params.id, function (err, diary) {
            if (err)
                res.json({ code: 2, msg: 'can\'t find', err: err });
            diary.content = req.body.content;
            diary.title = req.body.title;
            diary.save(function (err) {
                if (err)
                    res.json({ code: 1, msg: 'save err', err: err });
                res.json({ code: 0, msg: 'item Update!' });
            });
        });
    })
    .delete(function (req, res) {
        Diary.remove({
            _id: req.params.id
        }, function (err, diary) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item Delete!' });
        });
    });

module.exports = router;