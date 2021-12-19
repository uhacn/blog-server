// 将相似语句抽出
const common = async (modelMethod, ctx, todo) => {
  await modelMethod.then(res => {
    // console.log(res);
    ctx.body = res
  }).catch(err => {
    ctx.body = `${todo}异常`,
      console.error(err)
  })
}

class CrudUtil {
  // 添加的公共方法
  // async add(model, params, ctx) {
  //   await model.create(params).then(res => {
  //       ctx.body = res
  //   }).catch(err => {
  //     ctx.body = "添加异常",
  //     console.error(err)
  //   })
  // }

  // 添加的公共方法
  async add(model, params, ctx) {
    await common(model.create(params), ctx, '添加')
  }

  // 查询所有的公共方法
  async find(model, ctx) {
    await common(model.find(), ctx, '查询')
  }

  // 查询单个的公共方法
  async findOne(model, params, ctx) {
    await common(model.findOne(params), ctx, '查询')
  }

  // 修改的公共方法
  async update(model, where, params, ctx) {
    await common(model.updateOne(where, params), ctx, '修改')
  }

  // 删除的公共方法
  async del(model, where, ctx) {
    await common(model.findOneAndDelete(where), ctx, '删除')
  }
}

module.exports = new CrudUtil()