const jwt = require('jsonwebtoken')
const fs = require('fs')

// const { PRIVATE_KEY } = require('../app/config')
const { User } = require('../models/user')
const { File } = require('../models/file')
const { AVATAR_PATH } = require('../constants/filePath')
const errorType = require('../constants/errorType');

class UserController {
  // 用户注册
  async userReg(ctx, next) {
    const { username, password } = ctx.request.body;
    await User.create({ username, password }).then(res => {
      ctx.body = res
    }).catch(err => {
      ctx.body = '注册异常',
        console.error(err)
    })
  }

  // 用户登录
  async userLogin(ctx, next) {
    const { _id, username, password } = ctx.user;
    const token = jwt.sign({ _id, username, password }, 'blog-server', {
      expiresIn: 60 * 60 * 24
    })
    ctx.body = { username, password, token }
  }

  // 修改密码
  async pwdModify(ctx) {
    const { username, password } = ctx.request.body
    await User.updateOne({ username }, { password })
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

  // 获取用户头像
  async getAvatar(ctx, next) {
    const { username } = ctx.params;
    let result = ''
    await File.find({ username }).then(res => {
      // 取最后一个上传头像
      result = res.pop()
    });
    // 设置响应的类型
    ctx.response.set('content-type', result.mimetype)
    // 将头像数据放进响应体
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
  }

  // 修改用户个人信息
  async userinfoModify(ctx, next) {
    // 1. 获取要修改的信息
    let { _id, avatar = '', sex = '', desc = '', phone = '', email = '' } = ctx.request.body
    // 2. 对信息进行修改
    await User.updateOne({ _id }, { avatar, sex, desc, phone, email }).then(res => {
      if (res.modifiedCount > 0) {
        ctx.body = { code: 200, msg: '信息修改成功' }
      } else {
        ctx.body = { code: 400, msg: '信息修改失败' }
      }
    }).catch(err => {
      ctx.body = '资料更新异常'
    })
  }
}

module.exports = new UserController()