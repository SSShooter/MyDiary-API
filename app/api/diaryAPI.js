var Folder = require('../models/Folder')
var Diary = require('../models/Diary')
var express = require('express')
var formidable = require('formidable')
var fs = require('fs')
var router = express.Router()

router.route('/diary')
  .post(function (req, res) {
    req.body.username = req.session.username
    var diary = new Diary(req.body)
    diary.save(function (err) {
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

router.route('/diary/:id')
  .put(function (req, res) {
    Diary.findById(req.params.id, function (err, diary) {
      if (err) {
        res.json({
          code: 2,
          msg: 'can\'t find',
          err: err
        })
      }
      diary.content = req.body.content
      diary.title = req.body.title
      diary.save(function (err) {
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
    Diary.findOneAndRemove({
      _id: req.params.id,
      username : req.session.username
    }, function (err, diary) {
      if (err || !diary) {
        res.json({
          code: 1,
          msg: 'err',
          err: err
        })
        return
      }
      Folder.findByIdAndUpdate(diary.folderId, {
        $inc: {
          total: -1
        }
      }, function () {
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

router.route('/diary/picupload')
  .post(function (req, res) {
    var form = new formidable.IncomingForm()
    form.parse(req, function (err, fields, files) {
      if (err) {
        res.send(err)
        return
      }
      var extName = '' // 后缀名
      switch (files.file.type) {
        case 'image/pjpeg':
          extName = 'jpg'
          break
        case 'image/jpeg':
          extName = 'jpg'
          break
        case 'image/png':
          extName = 'png'
          break
        case 'image/x-png':
          extName = 'png'
          break
      }
      var newName = Date.now() + randomString()
      var path = require('path')

      fs.renameSync(files.file.path, path.resolve(path.resolve(__dirname, '..'), '..') + '/public/img/' + newName + '.' + extName)
      res.json({
        pic: 'http://www.time-record.net:8080/img/' + newName + '.' + extName
      })
    })
  })

function randomString (len) {
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
