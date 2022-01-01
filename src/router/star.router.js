const Router = require('koa-router');


const { createStar, findAllStar } = require('../controller/star.controller');

const startRouter = new Router({ prefix: '/star'});

// 添加评论
startRouter.post('/', createStar);


// 查询评论
startRouter.get('/', findAllStar);


module.exports = startRouter;