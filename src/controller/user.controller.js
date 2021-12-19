const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../app/config')
const { User } = require('../models/index')
const { add, find, findOne, update, del } = require('./crudUtill/index')
const errorType = require('../constants/errorType');

class UserController {
  // 用户注册
  async userReg(ctx, next) {
    const { username, password } = ctx.request.body;
    await add(User, { username, password }, ctx)
    // await User.create({ username, password }).then(res => {
    //   ctx.body = res
    // }).catch(err => {
    //   ctx.body = '注册异常',
    //     console.error(err)
    // })
  }

  // 用户登录
  async userLogin(ctx, next) {
    const { username, password } = ctx.user;
    const token = jwt.sign({ username, password }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = { username, password, token }
  }

  // 修改密码
  async pwdModify (ctx) {
    const {username, password} = ctx.request.body
    await User.updateOne({username}, {password})
      .then(res => {
        if (res.modifiedCount > 0) {
          ctx.body = res
        } else {
          const error = new Error(errorType.PASSWORD_MODIFY_FAILED);
          return ctx.app.emit('error', error, ctx)
        }
      })
      .catch(err => {
        ctx.body = '密码修改失败'
      })
  }












  // 添加系统用户
  async userAdd(ctx, next) {
    const { username, password } = ctx.request.body;
    await add(User, { username, password }, ctx)
  }

  // 查询所有系统用户
  async userFindAll(ctx, next) {
    await find(User, ctx)
  }

  // 查询单个系统用户
  async userFindOne(ctx, next) {
    const { id } = ctx.params
    await findOne(User, { _id: id }, ctx)
  }

  // 修改系统用户
  async userUpdate(ctx, next) {
    const { id } = ctx.params
    const { username, password } = ctx.request.body
    await update(User, { _id: id }, { username, password }, ctx)
  }

  // 删除系统用户
  async userDelete(ctx, next) {
    const { id } = ctx.params
    await del(User, { _id: id }, ctx)
  }
}

module.exports = new UserController()