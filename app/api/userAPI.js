var User = require('../models/User')
var UserInfo = require('../models/UserInfo')
var formidable = require('formidable')
var fs = require('fs')
var express = require('express')
var router = express.Router()

var app = express()

var session = require('express-session')
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'bugaosuni'
}))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

router.use(function (req, res, next) {
  console.log('Something is happening.')
  next()
})

router.route('/login')
  .post(function (req, res) {
    User.findOne({
      name: req.body.name
    }, (err, user) => {
      if (err) {
        res.json({
          code: 4,
          msg: 'db err'
        })
        return
      }
      if (user === null) {
        res.json({
          code: 3,
          msg: 'wrong username'
        })
        return
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        console.log(req.body.name, req.session.id)
        if (err) {
          res.json({
            code: 2,
            msg: 'db err',
            err: err
          })
        }
        if (!isMatch) {
          res.json({
            code: 1,
            msg: 'wrong password'
          })
        } else {
          req.session.username = req.body.name
          res.json({
            code: 0,
            msg: 'login!'
          })
        }
      })
    })
  })

router.route('/register')
  .post((req, res) => {
    var user = new User(req.body)
    var userinfo = new UserInfo({
      username: req.body.name
    })
    console.log(user)
    console.log(userinfo)
    user.save(err => {
      if (err) {
        res.json({
          code: 1,
          msg: 'user save err',
          err: err
        })
        return
      }
      userinfo.save(err => {
        if (err) {
          res.json({
            code: 1,
            msg: 'info save err',
            err: err
          })
          return
        }
        req.session.username = req.body.name
        res.json({
          code: 0,
          msg: 'User created!'
        })
      })
    })
  })

router.route('/getinfo')
  .get(function (req, res) {
    UserInfo.findOne({
      username: req.session.username
    }, function (err, info) {
      if (err) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      }
      res.json({
        code: 0,
        data: info
      })
    })
  })
router.route('/saveinfo')
  .post((req, res) => {
    UserInfo.findOneAndUpdate({
      username: req.session.username
    }, req.body, function (err, info) {
      if (err) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
      }
      res.json({
        code: 0,
        msg: 'ok'
      })
    })
  })
router.route('/uploadavatar')
  .post((req, res) => {
    UserInfo.findOne({
      username: req.session.username
    }, (err, info) => {
      if (err) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
        return
      }
      console.log(info)
      var form = new formidable.IncomingForm()
      form.parse(req, (err, fields, files) => {
        console.log(info)
        if (err) {
          res.send(err)
          return
        }
        var extName = 'png'
        var newName = Date.now() + randomString()
        var path = require('path')
        fs.renameSync(files.file.path, path.resolve(path.resolve(__dirname, '..'), '..') + '/public/avatar/' + newName + '.' + extName)
        info.avatar = 'http://www.time-record.net:8080/avatar/' + newName + '.' + extName
        info.save(function () {
          res.json({
            code: 0,
            data: info
          })
        })
      })
    })
  })

function randomString(len) {
  len = len || 4
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
module.exports = router