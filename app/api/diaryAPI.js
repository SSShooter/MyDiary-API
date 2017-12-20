var Folder = require('../models/Folder')
var Diary = require('../models/Diary')
var express = require('express')
var formidable = require('formidable')
var fs = require('fs')
var router = express.Router()

router
  .route('/diary')
  .get((req, res) => { // 以keyword搜索日记标题
    let keyword = req.query.q
    let reg = new RegExp(keyword)
    Diary.find({ title: reg, username: req.session.username })
      .exec()
      .then(diaries => {
        res.json({
          code: 0,
          data: diaries,
          msg: 'ok'
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
  .post(function(req, res) {
    req.body.username = req.session.username
    var diary = new Diary(req.body)
    diary.save(function(err) {
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

router
  .route('/diary/:id')
  .patch(function(req, res) { // 修改日记内容
    Diary.findOne({
      _id: req.params.id,
      username: req.session.username
    })
      .exec()
      .then(diary => {
        diary.content = req.body.content
        return diary.save()
      })
      .then(result => {
        res.json({
          code: 0,
          msg: 'item Update!'
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
  .delete(function(req, res) {
    Diary.findOneAndRemove(
      {
        _id: req.params.id,
        username: req.session.username
      },
      function(err, diary) {
        if (err || !diary) {
          res.json({
            code: 1,
            msg: 'err',
            err: err
          })
          return
        }
        Folder.findByIdAndUpdate(
          diary.folderId,
          {
            $inc: {
              total: -1
            }
          },
          function() {
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
          }
        )
      }
    )
  })

router.route('/diary/picupload').post(function(req, res) {
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
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

    fs.renameSync(
      files.file.path,
      path.resolve(path.resolve(__dirname, '..'), '..') +
        '/public/img/' +
        newName +
        '.' +
        extName
    )
    res.json({
      // pic: 'http://www.time-record.net:8080/img/' + newName + '.' + extName
      pic: 'http://192.168.0.144:8090/img/' + newName + '.' + extName
    })
  })
})

function randomString(len) {
  len = len || 4
  var $chars =
    'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
module.exports = router
