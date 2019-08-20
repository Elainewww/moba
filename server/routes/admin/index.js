module.exports = app => {
  const express = require('express')
  const router = express.Router() //子路由
  const Category = require('../../models/Category')
  router.post('/categories', async(req, res) => {
    const model = await Category.create(req.body)
    res.send(model) //发回客户端让客户端知道完成了
  })
  router.get('/categories', async(req, res) => {
    const items = await Category.find().limit(10)
    res.send(items)
  })
  app.use('/admin/api', router)
}