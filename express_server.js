let express = require('express')
let app = express()
let bodyParser = require('body-parser')
// 创建application/x-www-form-urlencoded 编码解析
let urlencodedParser = bodyParser.urlencoded({extended: false})
app.use('/public', express.static('public'))

app.get('/index.html', function (req, res){
  res.sendFile(__dirname + '/' + 'index.html')
})
app.get('/process_get', function(req, res) {
  // 输出json格式
  let response = {
    'first_name': req.query.first_name,
    'last_name': req.query.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})
app.post('/process_post', urlencodedParser, function(req, res) {
  // 输出json格式
  let response = {
    'first_name': req.body.first_name,
    'last_name': req.body.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

let server = app.listen(8081, function () {
  let host = server.address().address
  let port = server.address().port

})