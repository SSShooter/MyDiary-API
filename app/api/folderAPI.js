var Folder = require('../models/Folder');
var express = require('express');
var router = express.Router();

var app = express();

var session = require('express-session');
app.use(session({
  resave: true, // don't save session if unmodified  
  saveUninitialized: false, // don't create session until something stored  
  secret: 'bugaosuni'
}));


var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
router.use(function (req, res, next) {
  console.log('Something is happening.');
  next();
});

router.route('/folder')
  .post(function (req, res) {
    req.body.username = req.session.username;
    req.body.total = 0;
    console.log(req.body);
    var folder = new Folder(req.body);
    folder.save(function (err) {
      if (err)
        res.json({
          code: 1,
          msg: 'err',
          err: err
        });
      res.json({
        code: 0,
        msg: 'folder created!'
      });
    });
  })

  .get(function (req, res) {
    console.log(req.session.username)
    Folder.find({
      username: req.session.username
    }, function (err, folder) {
      if (err)
        res.json({
          code: 1,
          msg: 'err',
          err: err
        });
      res.json({
        code: 0,
        data: folder
      });
    });
  });

router.route('/folder/:id')
  .put(function (req, res) {
    Folder.find({
      _id: req.params.id
    }, function (err, folder) {
      if (err)
        res.json({
          code: 1,
          msg: 'find doc err',
          err: err
        });
      folder.foldername = req.body.foldername;
      folder.save(function (err) {
        if (err)
          res.json({
            code: 2,
            msg: 'doc save err',
            err: err
          });
        res.json({
          code: 0,
          msg: 'Folder updated!'
        });
      });
    });
  })

router.route('/folder/:id')
  .delete(function (req, res) {
    Folder.findById(req.params.id, function (err, folder) {
      console.log(folder, Boolean(folder === null));
      if (err)
        res.json({
          code: 1,
          msg: 'err',
          err: err
        });
      else if (folder === null)
        res.json({
          code: 2,
          msg: 'folder not exist'
        });
      else if (folder.username !== req.session.username)
        res.json({
          code: 3,
          msg: 'not your folder',
          err: err
        });
      else {
        folder.remove();
        res.json({
          code: 0,
          msg: 'Successfully deleted'
        });
      }
    });
  });

var Diary = require('../models/Diary');
var Phonebook = require('../models/Phonebook');
var Todolist = require('../models/Todolist');

router.route('/folder/:type/:folderId')
  .get(function (req, res) {
    if (req.params.type === 'diary')
      Diary.find({
        folderId: req.params.folderId
      }).sort('-createdate').exec(function (err, diary) {
        diary.total = diary.length;
        if (err)
          res.json({
            code: 1,
            msg: 'find doc err',
            err: err
          });
        res.json({
          code: 0,
          data: diary
        });
      });
    else if (req.params.type === 'phonebook')
      Phonebook.find({
        folderId: req.params.folderId
      }).sort('initial').exec(function (err, phonebook) {
        phonebook.total = phonebook.length;
        if (err)
          res.json({
            code: 1,
            msg: 'find doc err',
            err: err
          });
        res.json({
          code: 0,
          data: phonebook
        });
      });
    else if (req.params.type === 'todolist')
      Todolist.find({
        folderId: req.params.folderId
      }, function (err, todolist) {
        todolist.total = todolist.length;
        if (err)
          res.json({
            code: 1,
            msg: 'find doc err',
            err: err
          });
        res.json({
          code: 0,
          data: todolist
        });
      });
    else {
      res.json({
        code: 9,
        msg: 'wrong type'
      });
    }
  })

module.exports = router;