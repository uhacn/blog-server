const mongoose = require('mongoose')

// 系统用户模型对象
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  avatar: {
    type: String,
    default: ''
  },
  // sex: {
  //   type: String,
  //   default: ''
  // },
  // desc: {
  //   type: String,
  //   default: ''
  // },
  // phone: {
  //   type: String,
  //   default: ''
  // },
  // email: {
  //   type: String,
  //   default: ''
  // }
})

const User = mongoose.model('users', userSchema)

module.exports = {
  User
}