let express = require('express')
let app = express()
let fs = require('fs')
app.get('/listUsers', function(req, res) {
  fs.readFile(__dirname + '/' + 'user.json', 'utf8', function (err, data) {
    console.log(data)
    res.end(data)
  })
})

let server = app.listen(8081, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('应用实例， 访问地址为 http: // %s:%s', host, port)
})