const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false,
    set(val) { //安装了bcrypt,用于加密
      return require('bcrypt').hashSync(val, 10) //生成密码散列�?散列指数一�?0-12
    }
  },  
})

module.exports = mongoose.model('AdminUser', schema)