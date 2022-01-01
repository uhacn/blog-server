const Star = require('../model/star.model')
const Article = require('../model/article.model')


class StarController {
  // 添加评论
  async createStar(ctx, next) {
    const star = ctx.request.body
    let isStar = false
    await Star.create(star).then(res => {
      if (res) {
        isStar = true
        ctx.body = {
          code: 200,
          msg: '点赞成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '点赞失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '点赞出现异常',
        err
      }
    })
    // 文章评论数加1
    if (isStar) {
      await Article.updateOne({ id: star.articleId }, { $inc: { star: 1 } })
    }
  }

  // 后台评论查询，根据文章作者查询
  async findAllStar(ctx, next) {
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
    await Star.find({ author }).count().then(res => {
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
    await Star.find({ author }).skip(start).limit(pageSize).then(res => {
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


module.exports = new StarController()