const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors');
const koaJwt = require('koa-jwt')

const useRoutes = require('../router/index')
const errorHandler = require('./errorHandler')
// const { PUBLIC_KEY, PRIVATE_KEY } = require('./config')

const app = new Koa()

app.use(cors())
app.use(koaJwt({ secret: 'blog-server' }).unless({
  path: [/^\/user\/login/, /^\/user\/reg/, /^\/user\/avatar/, /^\/article\/picture/]
}))
app.use(bodyparser())
useRoutes(app)

app.on('error', errorHandler);



module.exports = app

