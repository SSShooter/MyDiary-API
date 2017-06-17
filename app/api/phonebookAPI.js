var Phonebook = require('../models/Phonebook');
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


router.route('/phonebook')
    .post(function (req, res) {
        console.log(req.body);
        var phonebook = new Phonebook(req.body);

        phonebook.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Phonebook created!' });
        });
    })

    .get(function (req, res) {
        Phonebook.find(function (err, phonebook) {
            if (err)
                res.send(err);

            res.json(phonebook);
        });
    });

router.route('/phonebook/:id')

    .get(function (req, res) {
        Phonebook.findById(req.params.id, function (err, phonebook) {
            if (err)
                res.send(err);
            res.json(phonebook);
        });
    })

    .put(function (req, res) {
        Phonebook.findById(req.params.id, function (err, phonebook) {
            if (err)
                res.send(err);
            phonebook.save(function (err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Phonebook updated!' });
            });

        });
    })

router.route('/phonebook/:id')
    .delete(function (req, res) {
        Phonebook.remove({
            _id: req.params.id
        }, function (err, phonebook) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;