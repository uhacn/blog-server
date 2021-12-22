const mongoose = require('mongoose')

// 文章模型对象
const userSchema = new mongoose.Schema({
  id: Number,
  title: String,
  createTime: String,
  content: String,
  stemfrom: String,
  read: {
      type: Number,
      default: 0
  },
  star: {
      type: Number,
      default: 0
  },
  comment: {
      type: Number,
      default: 0
  },
  author: String
})

const Article = mongoose.model('article', userSchema, 'article')

module.exports = {
  Article
}