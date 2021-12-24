const Article = require('../model/article.model')

class ArticleController {
  // 添加文章
  async createArticle(ctx, next) {
    const article = ctx.request.body
    await Article.create(article).then(res => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: '文章发布成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '文章发布失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '文章发布时出现异常',
        err
      }
    })
  }

  // 查询所有文章（分页）
  async getAllArticle(ctx, next) {
    // 1. 获取页码和作者
    let { page, author } = ctx.query
    //判断页码
    if (!page || isNaN(Number(page))) {
      page = 1
    } else {
      page = Number(page)
    }
    // 计算文章总数
    let count = 0
    await Article.find({ author }).count().then(res => {
      count = res
    })
    // 计算总页数
    const pageSize = 10
    let totalPage = 0
    if (count > 0) {
      totalPage = Math.ceil(count / pageSize)
    }
    // 设置查询页码
    if (totalPage > 0 && page > totalPage) {
      page = totalPage
    } else if (page < 1) {
      page = 1
    }
    //计算起始位置
    let start = (page - 1) * pageSize

    // 2. 查询文章
    await Article.find({ author }).skip(start).limit(pageSize).then(res => {
      if (res && res.length > 0) {
        ctx.body = {
          code: 200,
          msg: '文章查询成功',
          result: res,
          page,
          pageSize,
          count
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '没有查询到文章'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '文章查询时出现异常',
        err
      }
    })
  }

  // 查询单个文章
  async getOneArticle(ctx, next) {
    // 1. 获取文章id
    let { id } = ctx.params
    let isRead = false

    // 2. 查询文章
    await Article.findOne({ id }).then(res => {
      if (res) {
        isRead = true
        ctx.body = {
          code: 200,
          msg: '文章查询成功',
          result: res
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '文章查询失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '文章查询时出现异常',
        err
      }
    })

    // 查询成功阅读量增加1
    if (isRead) {
      await Article.updateOne({ id }, { $inc: { read: 1 } })
    }
  }

  async updateArticle(ctx, next) {
    // 1. 获取文章id
    const { id } = ctx.params
    const { title, stemFrom, content } = ctx.request.body

    // 2.更新文章
    await Article.updateOne(
      { id },
      { title, stemFrom, content }
    ).then(res => {
      if (res.modifiedCount > 0) {
        ctx.body = {
          code: 200,
          msg: '文章更新成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '文章更新失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '文章更新时出现异常',
        err
      }
    })
  }

  // 删除文章
  async removeArticle(ctx, next) {
    // 1. 获取文章
    const { id } = ctx.params

    // 2. 删除文章
    await Article.findOneAndDelete({ id }).then(res => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: '文章删除成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '文章删除失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '文章删除时出现异常'
      }
    })
  }
}

module.exports = new ArticleController()