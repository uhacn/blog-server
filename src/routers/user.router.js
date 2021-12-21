const Router = require('koa-router')

const { userReg, userLogin, pwdModify, getAvatar } = require('../controller/user.controller')
const { verifyReg, verifyLogin, verifyToken, passwordHandler } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

// 用户注册
userRouter.post('/reg', verifyReg, passwordHandler, userReg)

// 用户登录
userRouter.post('/login', verifyLogin, userLogin)

// 用户验证
userRouter.post('/verify', verifyToken)

// 修改密码
userRouter.patch('/pwd',passwordHandler,pwdModify)

// 
userRouter.get('/avatar/:username', getAvatar)


module.exports = userRouter