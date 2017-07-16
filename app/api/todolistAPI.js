var Folder = require('../models/Folder')
var Todolist = require('../models/Todolist')
var express = require('express')
var router = express.Router()
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

router.use(function (req, res, next) {
  console.log('Something is happening in todolistAPI.js')
  next()
})

router.route('/todolist')
  .post(function (req, res) {
    req.body.username = req.session.username
    var todolist = new Todolist(req.body)
    todolist.save(function (err) {
      Folder.findByIdAndUpdate(req.body.folderId, {
        $inc: {
          total: +1
        }
      }).exec()
      if (err) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      }
      res.json({
        code: 0,
        msg: 'item created!'
      })
    })
  })

router.route('/todolist/:id')
  .put(function (req, res) {
    Todolist.findById(req.params.id, function (err, todolist) {
      if (err) {
        res.json({
          code: 2,
          msg: 'can\'t find',
          err: err
        })
      }
      console.log(todolist.state, !todolist.state)
      todolist.state = !todolist.state
      console.log(todolist.state)
      todolist.save(function (err) {
        if (err) {
          res.json({
            code: 1,
            msg: 'save err',
            err: err
          })
        }
        res.json({
          code: 0,
          msg: 'item Update!'
        })
      })
    })
  })
  .delete(function (req, res) {
    Todolist.findOneAndRemove({
      _id: req.params.id,
      username : req.session.username
    }, function (err, todolist) {
      if (err || !todolist) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
        return
      }
      Folder.findByIdAndUpdate(todolist.folderId, {
        $inc: {
          total: -1
        }
      }, function (err) {
        if (err) {
          res.json({
            code: 1,
            msg: 'err',
            err: err
          })
        }
        res.json({
          code: 0,
          msg: 'item Delete!'
        })
      })
    })
  })

module.exports = router
