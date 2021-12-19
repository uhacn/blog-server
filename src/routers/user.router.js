const Router = require('koa-router')

const { userReg, userLogin, pwdModify,userAdd, userFindAll, userFindOne, userUpdate, userDelete } = require('../controller/user.controller')
const { verifyReg, verifyLogin, verifyToken, passwordHandler } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

// 用户注册
userRouter.post('/reg', verifyReg, passwordHandler, userReg)

// 用户登录
userRouter.post('/login', verifyLogin, userLogin)

// 用户验证
userRouter.post('/verify', verifyToken)

// 修改密码
userRouter.patch('/pwd', pwdModify)



















// 添加系统用户
userRouter.post('/', userAdd)

// 查询所有系统用户
userRouter.get('/', userFindAll)

// 查询单个系统用户
userRouter.get('/:id', userFindOne)


// 修改系统用户
userRouter.patch('/:id', userUpdate)

// 删除系统用户
userRouter.delete('/:id', userDelete)



module.exports = userRouter