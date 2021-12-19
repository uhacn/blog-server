const app = require('./app/index')
const config = require('./app/config')
const mongoConnect = require('./app/database')

// 连接数据库
mongoConnect()

app.listen(config.APP_PORT, () => {
  console.log(`${config.APP_PORT}端口服务器启动成功~`);
}) 