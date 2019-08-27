module.exports = app => {
  const express = require('express')
  const router = express.Router({
    mergeParams:true
  }) //子路由
  //const Category = require('../../models/Category')
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model) //发回客户端让客户端知道完成了
  })
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) //通过id找，然后把body更新掉
    res.send(model)
  })
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body) //通过id找，然后把body更新掉
    res.send({
      success: true
    })
  })
  router.get('/', async(req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10) //populate关联取出
    //加了populate以后，取出的parent变成一个对象，而不仅是一个字段
    res.send(items)
  })
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api/rest/:resource', async (req,res,next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
}
//后端接口