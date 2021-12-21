const mongoose = require('mongoose')

// 系统用户模型对象
const fileSchema = new mongoose.Schema({
  username: String,
  filename: String,
  mimetype: String,
  size: String
})

// 添加第三个参数可以指定表名 防止自动变为复数形式
const File = mongoose.model('file', fileSchema, 'file')

module.exports = {
  File
}