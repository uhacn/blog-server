const Router = require('koa-router')

const { userReg, userLogin, updatePwd, getAvatar, updateUserInfo } = require('../controller/user.controller')
const { verifyReg, verifyLogin, verifyToken, passwordHandler } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

// 用户注册
userRouter.post('/reg', verifyReg, passwordHandler, userReg)

// 用户登录
userRouter.post('/login', verifyLogin, userLogin)

// 用户验证
userRouter.get('/verify', verifyToken)

// 修改密码
userRouter.patch('/pwd', passwordHandler, updatePwd)

// 获取用户头像
userRouter.get('/avatar/:username', getAvatar)

// 修改用户信息
userRouter.patch('/info', updateUserInfo)

module.exports = userRouter