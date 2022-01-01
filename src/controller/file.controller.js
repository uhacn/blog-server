const { APP_HOST, APP_PORT } = require('../app/config')
const User = require('../model/user.model')
const Avatar = require('../model/avatar.model')
const Picture = require('../model/picture.model')

class FileController {
  async createAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { username } = ctx.state.user;
    // 上传头像
    await Avatar.create({ username, filename, mimetype, size }).then(res => {
      ctx.body = res
    }).catch(err => {
      ctx.body = { msg: "上传头像异常", err }
    })
    // 更新头像地址
    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/avatar/${username}`
    await User.updateOne({ username }, { avatarUrl }).then(res => {
      if (res.modifiedCount > 0) {
        ctx.body = res
      }
    }).catch(err => {
      ctx.body = { msg: '更新头像地址失败', err }
    })
  }

  async createPicture(ctx, next) {
    const files = ctx.req.files;
    const { username } = ctx.state.user;
    const { articleId } = ctx.params;

    // 遍历所有图片并上传
    for (let file of files) {
      const { filename, mimetype, size } = file;
      await Picture.create({ username, filename, mimetype, size, articleId }).then(res => {
        ctx.body = {
          "errno": 0,
          "data": [{
            url: `http://localhost:8000/article/picture/${articleId}?size=small`,
            alt: "",
            href: ""
          }]
        }
      }).catch(err => {
        ctx.body = { msg: "上传图片异常", err }
      })
    }
  }
}

module.exports = new FileController()

