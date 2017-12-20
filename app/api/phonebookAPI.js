var Folder = require('../models/Folder')
var Phonebook = require('../models/Phonebook')
var express = require('express')
var router = express.Router()

router.route('/phonebook')
  .post((req, res) => {
    req.body.username = req.session.username
    var phonebook = new Phonebook(req.body)
    phonebook
      .save()
      .then(() => {
        return Folder.findByIdAndUpdate(req.body.folderId, {
          $inc: {
            total: +1
          }
        }).exec()
      })
      .then(() => {
        res.json({
          code: 0,
          msg: 'item created!'
        })
      })
      .catch(err => {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      })
  })

router.route('/phonebook/:id')
  .put(function (req, res) {
    Phonebook.findById(req.params.id).exec()
      .then((phonebook) => {
        phonebook.contact = req.body.contact
        phonebook.number = req.body.number
        return phonebook.save()
      }, err => {
        res.json({
          code: 2,
          msg: 'can\'t find',
          err: err
        })
      })
      .then(() => {
        res.json({
          code: 0,
          msg: 'item Update!'
        })
      }, err => {
        res.json({
          code: 1,
          msg: 'save err',
          err: err
        })
      })
  })
  .delete((req, res) => {
    Phonebook.findOneAndRemove({
        _id: req.params.id,
        username: req.session.username
      }).exec()
      .then(phonebook => {
        if (!phonebook) {
          return Promise.reject('查不到记录')
        }
        return Folder.findByIdAndUpdate(phonebook.folderId, {
          $inc: {
            total: -1
          }
        })
      }, err => {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      })
      .then(doc => {
        res.json({
          code: 0,
          msg: 'item Delete!'
        })
      })
      .catch(err => {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      })
  })

module.exports = router