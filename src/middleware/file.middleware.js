const path = require('path')
const fs = require('fs')
const multer = require('koa-multer');
const jimp = require('jimp')

const { AVATAR_PATH, PICTURE_PATH } = require('../constants/filePath')

// 上传头像
const avatarUpload = multer({
  storage: multer.diskStorage({
    // 1. 设置文件的存储位置
    destination: function (req, file, cb) {
      const dir = AVATAR_PATH 
      // 判断目录是否存在
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      cb(null, dir)
    },
    // 2. 设置文件名称
    filename: function (req, file, cb) {
      const fileName = Date.now() + path.extname(file.originalname)
      cb(null, fileName)
    }
  })
});
const avatarHandler = avatarUpload.single('avatar')

// 上传配图
const pictureUpload = multer({
  storage: multer.diskStorage({
    // 1. 设置文件的存储位置
    destination: function (req, file, cb) {
      const dir = PICTURE_PATH
      // 判断目录是否存在
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }
      cb(null, dir)
    },
    // 2. 设置文件名称
    filename: function (req, file, cb) {
      const fileName = Date.now() + path.extname(file.originalname)
      cb(null, fileName)
    }
  })
})
const pictureHandler = pictureUpload.array('picture', 9);

const pictureResize = async (ctx, next) => {
  const files = ctx.req.files;
  for (let file of files) {
    const picPath = path.join(file.destination, file.filename);
    jimp.read(file.path).then(image => {
      image.resize(1280, jimp.AUTO).write(`${picPath}-large`);
      image.resize(640, jimp.AUTO).write(`${picPath}-middle`);
      image.resize(320, jimp.AUTO).write(`${picPath}-small`);
    })
  }
  await next()
}


module.exports = { avatarHandler, pictureHandler, pictureResize }

