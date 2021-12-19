const mongoose = require('mongoose')

const config = require('../app/config')

module.exports = () => {
  mongoose.connect(`mongodb://${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_DATABASE}`, { useNewUrlParser: true })
    .then(() => {
      console.log('数据库连接成功');
    }).catch(err => {
      console.err('数据库连接失败', err);
    })
}