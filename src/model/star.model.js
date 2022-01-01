let mongoose = require('mongoose')

//点赞文档对象
let schema = new mongoose.Schema({
  username: String,
  articleTitle: String,
  articleId: Number,
  author: String,
  createTime: String
})

let Star = mongoose.model('star', schema, 'star')

module.exports = Star