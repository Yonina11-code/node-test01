let express = require('express')
let app = express()
let fs = require('fs')
let id = 2

// 添加新用户数据
let user = {
  'user4': {
    'name': 'mod',
    'password': '1333',
    'profession': 'teacher',
    'id': 4
  }
}
app.get('/adduser', function(req, res) {
  // 读取已存在的数据
  fs.readFile(__dirname + '/' + 'user.json', 'utf8', function(err, data) {
    data = JSON.parse(data)
    console.log(data, err)
    data['user4'] = user['user4']
    res.end(JSON.stringify(data))
  })
})
app.get('/ser', function(req, res) {
  fs.readFile(__dirname +'/' + 'user.json', 'utf8', function (err, data) {
    data = JSON.parse(data)
    console.log('data',data, err)
    delete data['user' + id]
    console.log('after', data)
    res.end(JSON.stringify(data))
  })
})
app.get('/:id', function (req, res) {
  // 首先我们读取已存在的用户
  fs.readFile(__dirname +'/' + 'user.json', 'utf8', function (err, data) {
    data = JSON.parse(data)
    let user = data['user' + req.params.id]
    console.log(user)
    res.end(JSON.stringify(user))
  })
})

let server = app.listen(8081, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})