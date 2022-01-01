const mongoose = require('mongoose')

// 文件模型对象
const fileSchema = new mongoose.Schema({
  username: String,
  filename: String,
  mimetype: String,
  size: Number,
  articleId: String,
})

// 添加第三个参数可以指定表名 防止自动变为复数形式
const Picture = mongoose.model('picture', fileSchema, 'picture')

module.exports = Picture
 