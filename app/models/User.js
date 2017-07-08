var mongoose = require('mongoose')

// 用于md5加密
var bcrypt = require('bcryptjs')
// 加盐数
var SALT_WORK_FACTOR = 5
var userSchama = mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  password: String,
  email: String,
  mobile: Number,
  gender: Number
})
userSchama.pre('save', function (next) {
  var user = this
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  } else {
    this.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})
userSchama.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
}
var userModel = mongoose.model('user', userSchama)
module.exports = userModel
