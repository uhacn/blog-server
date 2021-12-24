const Comment = require('../model/comment.model')
const Article = require('../model/article.model')


class CommentController {
  // 添加评论
  async createComment(ctx, next) {
    const comment = ctx.request.body
    let isComment = false
    await Comment.create(comment).then(res => {
      if (res) {
        isComment = true
        ctx.body = {
          code: 200,
          msg: '发布成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '发布失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '评论发布时出现异常',
        err
      }
    })
    // 文章评论数加1
    if (isComment) {
      await Article.updateOne({ id: comment.articleId }, { $inc: { comment: 1 } })
    }
  }


  // 前台查询评论，通过文章ID查询
  async findByArticleId(ctx, next) {
    let { articleId } = ctx.query
    await Comment.find({ articleId}).then(rel => {
      if (rel && rel.length > 0) {
        ctx.body = {
          code: 200,
          msg: '评论查询成功',
          result: rel
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '评论查询失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '查询评论时出现异常',
        err
      }
    })
  }

  // 后台评论查询，根据文章作者查询
  async findByAuthor(ctx, next) {
    let { page, author } = ctx.query
    //判断页码
    if (!page || isNaN(Number(page))) {
      page = 1
    } else {
      page = Number(page)
    }
    //每页条数
    let pageSize = 10
    //计算总页数
    let count = 0
    await Comment.find({ author }).count().then(res => {
      count = res
    })
    let totalPage = 0
    if (count > 0) {
      totalPage = Math.ceil(count / pageSize)
    }
    //判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
      page = totalPage
    } else if (page < 1) {
      page = 1
    }
    //计算起始位置
    let start = (page - 1) * pageSize
    await Comment.find({ author }).skip(start).limit(pageSize).then(res => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          msg: '查询成功',
          result: res,
          page,
          pageSize,
          count
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '查询失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '查询时出现异常',
        err
      }
    })

  }
}


module.exports = new CommentController()