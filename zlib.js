const fs  = require('fs')
const zlib = require('zlib')
const gzip = zlib.createGzip()
const http = require('http')

http.createServer((req, res) => {
  // res 本身就是一个可写流
  const readerStream = fs.createReadStream('./index.js')
  res.writeHead(200, {
   'Content-Type': 'application/x-javascript;charset=utf-8',
   'Content-Encoding': 'gzip' // 告诉浏览器 压缩方式是gzip
  })
  readerStream.pipe(gzip).pipe(res)
}).listen(3000, () => {
  console.log('server start')
})
