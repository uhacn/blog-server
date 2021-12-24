const Router = require('koa-router');


const { createComment, findByArticleId, findByAuthor } = require('../controller/comment.controller');

const commentRouter = new Router({ prefix: '/comment'});

// 添加评论
commentRouter.post('/', createComment);

// 通过文章ID查询
commentRouter.get('/web', findByArticleId);

// 通过作者查询
commentRouter.get('/admin', findByAuthor);


module.exports = commentRouter;