module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams:true
  }) //子路由
  //const Category = require('../../models/Category')
  //创建资源
  router.post('/', async(req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model) //发回客户端让客户端知道完成了
  })
  //更新资源
  router.put('/:id', async(req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) //通过id找，然后把body更新掉
    res.send(model)
  })
  //删除资源
  router.delete('/:id', async(req, res) => {
    await req.Model.findByIdAndDelete(req.params.id) //通过id找，然后把body更新掉
    res.send({
      success: true
    })
  })
  //资源列表 加中间键，处理函数
  router.get('/', async(req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10) //populate关联取出
    //加了populate以后，取出的parent变成一个对象，而不仅是一个字段
    res.send(items)
  })
  //资源详情
  router.get('/:id', async(req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  //登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource',authMiddleware(), resourceMiddleware(), router) //两个路由：1. 登录；2. 自动获取模型

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' }) //dirname绝对地址,当前文件所在文件夹
  app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file) //express里没有req.file的，用了multer后将file附到req上了
  })

  app.post('/admin/api/login', async(req, res) => {
    const { username, password } = req.body //通过解构赋值, 可以将属性/值从对象/数组中取出,赋值给其他变量
    //1. 根据用户名找密码
    const user = await AdminUser.findOne({username}).select('+password')
    assert(user, 422, '用户不存在')
    // if (!user) {
    //   return res.status(422).send({ //设定状态码再发送，说明不是正常状态
    //     message: '用户不存在'
    //   })
    // }  
    //用http-assert更加简洁
    //2. 校验密码
    const isValide = require('bcrypt').compareSync(password, user.password)
    //因为在AdminUserjs里selec为false了，所以上面要select('+password')才能取出来
    assert(isValide, 422, '密码错误')
    // if(!isValide) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    //3. 返回token
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  //错误处理函数
  //前面只管抛出异常，这里再来捕获
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({ //没有状态码就报500
      message: err.message
    })
  })

}
//后端接口