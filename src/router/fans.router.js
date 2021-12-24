const Router = require('koa-router');


const { follow, unfollow, findFans} = require('../controller/fans.controller');

const fansRouter = new Router({ prefix: '/fans'});

// 粉丝关注
fansRouter.post('/follow', follow);

// 取消关注
fansRouter.post('/unfollow', unfollow);

// 查询粉丝
fansRouter.get('/', findFans);

module.exports = fansRouter;