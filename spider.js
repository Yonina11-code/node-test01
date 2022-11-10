let https = require('https') // 请求的是https
let http = require('http')
let url = require('url')
let cheerio = require('cheerio')

http.createServer(function (req, res) {
  let urlObj = url.parse(req.url, true)
  // 解析参数
  // 设置响应头部信息及编码
  res.writeHead(200, {
    'Content-Type': 'application/json;charset=utf-8',
    'access-control-allow-origin': "*" // 允许所以域通过控制，浏览器看到这个就不会阻止
  })
  switch(urlObj.pathname) {
    case '/api/aaa':
      httpget((data) => {
        console.log('res', res)
        res.end(spider(data))
      })
      break
    default:
      res.end('404')
  }
}).listen(8088)

function httpget (response) {
  let data = ''
  https.get('https://i.maoyan.com/', (res) => {
  // res相当于一个数据流
  res.on('data', (chunk) => { // on 一点一点接收数据
    data += chunk
  })
  res.on('end', () => { // 所有数据收集完之后
    console.log(data)
    response(data)
  })
  })

}

function spider (data) {
  // cheerio
  let $ = cheerio.load(data)
  let $moviewlist =$('.column.content')
  let movies = []
  $moviewlist.each((index, value) => {
    movies.push({
     title: $(value).find(".title").text()
    })
  })

  return JSON.stringify(movies) // 给客户端返回数据必须是字符串
}