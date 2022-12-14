let http = require('http')
let fs = require('fs')
let url = require('url')

// 创建服务器
http.createServer(function (request, response) {
  console.log('request', request.url)
  // 解析请求， 包括文件名
  let pathname = url.parse(request.url).pathname
  // 输出请求的文件名
  console.log('Request for', pathname, 'received')
  // 从文件系统中读取请求的文件内容
  fs.readFile(pathname.substr(1), function(err, data) {
    if (err) {
      console.log(err)
      response.writeHead(404, {'Content-type': 'text/html'})
    } else {
      response.writeHead(200, {'Content-type': 'text/html'})
      response.write(data.toString())
    }
    // 发送响应数据
    response.end()
  })
}).listen(8088)
console.log('Server running at http://127.0.0.1:8088/')