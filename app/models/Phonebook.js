var mongoose = require('mongoose')
var phonebookSchama = mongoose.Schema({
  folderId: {
    type: String,
    index: true,
    require: true
  },
  contact: {
    type: String,
    require: true
  },
  initial: {
    type: String,
    require: true
  },
  number: {
    type: String,
    require: true
  },
  createdate: {
    type: String,
    require: true
  }
})

var phonebookModel = mongoose.model('phonebook', phonebookSchama)
module.exports = phonebookModel
