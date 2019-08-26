const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } //***实现上级回调时知道去哪里找
})

module.exports = mongoose.model('Category', schema)