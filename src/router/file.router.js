const Router = require('koa-router');

const { avatarHandler, pictureHandler, pictureResize } = require('../middleware/file.middleware');
const { createAvatar, createPicture } = require('../controller/file.controller');

const fileRouter = new Router({ prefix: '/upload' });


fileRouter.post('/avatar', avatarHandler, createAvatar);
fileRouter.post('/picture/:articleId', pictureHandler, pictureResize, createPicture );

module.exports = fileRouter; 