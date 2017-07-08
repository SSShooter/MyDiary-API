var mongoose = require('mongoose')
var diarySchama = mongoose.Schema({
  folderId: {
    type: String,
    index: true,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  pic: [],
  tag: String,
  createdate: {
    type: Number,
    require: true
  },
  mood: String,
  weather: String,
  bookmark: false
})

var diaryModel = mongoose.model('diary', diarySchama)
module.exports = diaryModel
