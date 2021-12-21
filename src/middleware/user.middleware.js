const jwt = require('jsonwebtoken')

const errorType = require('../constants/errorType');
const md5password = require('../utils/passwordHandler')
const { User } = require('../models/index')
// const { PUBLIC_KEY } = require('../app/config')

// 用户注册验证中间件
const verifyReg = async (ctx, next) => {
  // 1.获取用户名和密码
  const { username, password } = ctx.request.body;
  // 2.判断用户名或者密码不能空
  if (!username || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断这次注册的用户名是否已经存在
  let isExist = false
  await User.findOne({ username }).then(res => {
    if (res) {
      isExist = true
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '注册时出现异常',
      err
    }
  })
  // 用户名已经被注册抛出异常
  if (isExist) {
    const error = new Error(errorType.USERNAME_ALREADY_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

// 用户登录验证中间件
const verifyLogin = async (ctx, next) => {
  // 1.获取用户名和密码
  const { username, password } = ctx.request.body;
  // 2.判断用户名或者密码不能空
  if (!username || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit('error', error, ctx)
  }
  // 3.判断这次登录的用户名是否存在
  let isReg = false
  let user = {}
  await User.findOne({ username }).then(res => {
    if (res) {
      user = res;
      isReg = true;
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      msg: '登录时出现异常',
      err
    }
  })
  if (!isReg) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit('error', error, ctx)
  }

  // 4.判断请求密码和数据库中的密码是否一致(加密后)
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT);
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user;
  await next()
}

const verifyToken = async (ctx, next) => {
  // 1. 获取token
  const authorization = ctx.header.authorization;
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION);
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.substr(7)
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, 'blog-server');
    ctx.user = result;
    ctx.body = '验证成功'
    await next()
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit('error', error, ctx)
  }   
}

// 将密码加密处理
const passwordHandler = async (ctx, next) => {
  const { password } = ctx.request.body;
  ctx.request.body.password = md5password(password);

  await next();
}

module.exports = { verifyReg, verifyLogin, verifyToken, passwordHandler }