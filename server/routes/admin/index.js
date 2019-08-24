module.exports = app => {
  const express = require('express')
  const router = express.Router() //子路由
  const Category = require('../../models/Category')
  router.post('/categories', async(req, res) => {
    const model = await Category.create(req.body)
    res.send(model) //发回客户端让客户端知道完成了
  })
  router.put('/categories/:id', async(req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body) //通过id找，然后把body更新掉
    res.send(model)
  })
  router.delete('/categories/:id', async(req, res) => {
    await Category.findByIdAndDelete(req.params.id, req.body) //通过id找，然后把body更新掉
    res.send({
      success: true
    })
  })
  router.get('/categories', async(req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })
  router.get('/categories/:id', async(req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  app.use('/admin/api', router)
}
//后端接口