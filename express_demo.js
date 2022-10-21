let express = require('express')
let app = express()
app.use('/public', express.static('public'))

app.get('/', function(req, res) {
  console.log('主页get请求')
  res.send('hello World')
})
app.post('/', function(req, res) {
  console.log('主页post请求')
  res.send('Hello Post')
})
app.get('/del_user', function(req, res) {
  console.log('/del_user响应delete请求')
  res.send('删除页面')
})
app.get('/list_user', function(req, res) {
  console.log('list_user Get 请求')
  res.send('用户列表页面')
})
app.get('/ab*cd', function(req, res) {
  console.log('/ab*cd get 请求')
  res.send('正则匹配')
})
let server = app.listen(8081, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})