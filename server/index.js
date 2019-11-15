const express = require("express")

const app = express()

app.set('secret', 'f343feftgwf23')

app.use(require('cors')()) //跨域
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads')) //托管静态文�?

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log('http://localhost:3000');
});