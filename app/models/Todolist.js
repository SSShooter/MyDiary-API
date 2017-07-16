var mongoose = require('mongoose')
var todolistSchama = mongoose.Schema({
  folderId: {
    type: String,
    index: true,
    require: true
  },
    // 未完成false完成true
  state: {
    type: Boolean,
    default: false,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  createdate: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  }
})

var todolistModel = mongoose.model('todolist', todolistSchama)
module.exports = todolistModel
