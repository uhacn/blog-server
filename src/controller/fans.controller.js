let Fans = require('../model/fans.mdoel')


class FansController {
  // 粉丝关注
  async follow(ctx) {
    const fans = ctx.request.body

    await Fans.create(fans).then(res => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: '关注成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '关注失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '关注时出现异常',
        err
      }
    })
  }

  // 取消关注
  async unfollow(ctx, next) {
    const { username, author } = ctx.request.body
    await Fans.findOneAndDelete({ username, author }).then(res => {
      if (res) {
        ctx.body = {
          code: 200,
          msg: '取关成功'
        }
      } else {
        ctx.body = {
          code: 300,
          msg: '取关失败'
        }
      }
    }).catch(err => {
      ctx.body = {
        code: 500,
        msg: '取关时出现异常',
        err
      }
    })
  }

  // 查询粉丝
  async findFans(ctx, next) {
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
    await Fans.find({ author }).count().then(res => {
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
    await Fans.find({ author }).skip(start).limit(pageSize).then(res => {
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


module.exports = new FansController()