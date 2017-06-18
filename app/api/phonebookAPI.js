var Phonebook = require('../models/Phonebook');
var express = require('express');
var router = express.Router();

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    console.log('Something is happening in phonebookAPI.js');
    next();
});


router.route('/phonebook')
    .post(function (req, res) {
        var phonebook = new Phonebook(req.body);
        phonebook.save(function (err) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item created!' });
        });
    });

router.route('/phonebook/:id')
    .put(function (req, res) {
        Phonebook.findById(req.params.id, function (err, phonebook) {
            if (err)
                res.json({ code: 2, msg: 'can\'t find', err: err });
            phonebook.contact = req.body.contact;
            phonebook.number = req.body.number;
            phonebook.save(function (err) {
                if (err)
                    res.json({ code: 1, msg: 'save err', err: err });
                res.json({ code: 0, msg: 'item Update!' });
            });
        });
    })
    .delete(function (req, res) {
        Phonebook.remove({
            _id: req.params.id
        }, function (err, phonebook) {
            if (err)
                res.json({ code: 1, msg: 'err', err: err });
            res.json({ code: 0, msg: 'item Delete!' });
        });
    });

module.exports = router;