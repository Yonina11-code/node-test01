const express = require('express')
const app = express()
const router = require('./router')

// 应用级别
app.use(function (req, res, next) {
  console.log('验证token')
  next()
})

// 应用级别, 匹配到/后走这里
app.use('/', router)


// 错误级别中间件
// 一般放在所有中间件的后面，即前面匹配不到了才走的这里
app.use((err, req, res, next) => {
  res.status(404).send('丢了')
})
app.listen(3001, () => {
  console.log('server start')
})