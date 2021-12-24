const { APP_HOST, APP_PORT } = require('../app/config')
const User = require('../model/user.model')
const File = require('../model/file.model')

class FileController {
  async createAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file;
    const { username } = ctx.state.user;
    // 上传头像
    await File.create({ username, filename, mimetype, size }).then(res => {
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
    const { id } = ctx.user;
    const { momentId } = ctx.params;

    // 遍历所有图片并上传
    for (let file of files) {
      const { filename, mimetype, size } = file;
      // await fileService.createPicture(filename, mimetype, size, id, momentId)
    }

    ctx.body = '上传动态配图成功';
  }
}

module.exports = new FileController()

