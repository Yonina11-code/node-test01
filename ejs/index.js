const express = require('express')
const app = express()
const router = require('./router')
// 配置模板引擎
app.set('views', './views') // 代码在views文件夹下
app.set('view engine', 'ejs')
// 配置静态资源
app.use(express.static('public'))
app.use('/static', express.static('static'))
// 配置解析post参数的中间件， 不用下载第三方，已经内置了
app.use(express.urlencoded({ extended: false })) // 用于解析post参数-类似： username=yxy&password=1234
app.use(express.json()) // 响应post请求中json格式的参数

// 应用级别
app.use(function (req, res, next) {
  console.log('验证token')
  next()
})

// 应用级别, 匹配到/后走这里
app.use('/', router)


// 错误级别中间件
// 一般放在所有中间件的后面，即前面匹配不到了才走的这里
// app.use((err, req, res, next) => {
//   res.status(404).send('丢了')
// })
app.listen(3001, () => {
  console.log('server start')
})