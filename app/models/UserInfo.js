var mongoose = require('mongoose')
var userinfoSchama = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  nickname: String,
  email: String,
  mobile: Number,
  gender: Number
})

var userinfoModel = mongoose.model('userinfo', userinfoSchama)
module.exports = userinfoModel
