const Router = require('koa-router');


const { createArticle, getAllArticle, getOneArticle, updateArticle, removeArticle, getPicture } = require('../controller/article.controller');

const articleRouter = new Router({ prefix: '/article' });

// 添加文章
articleRouter.post('/', createArticle);

// 查询所有文章
articleRouter.get('/', getAllArticle);

// 查询单个文章
articleRouter.get('/:id', getOneArticle);

// 修改文章
articleRouter.patch('/:id', updateArticle);

// 删除文章
articleRouter.delete('/:id', removeArticle);

// 获取文章配图
articleRouter.get('/picture/:articleId', getPicture);

module.exports = articleRouter;