let https = require('https') // 请求的是https
let http = require('http')
let url = require('url')


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
      httppost((data) => {
        res.end(data)
      })
      break
    default:
      res.end('404')
  }
}).listen(8088)

function httpget (response) {
  let data = ''
  https.get('https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=%E6%9D%AD%E5%B7%9E&ci=50&channelId=4', (res) => {
  // res相当于一个数据流
  res.on('data', (chunk) => { // on 一点一点接收数据
    data += chunk
  })
  res.on('end', () => { // 所有数据收集完之后
    console.log(data)
    response.end(data)
  })
  })

}

function httppost (cb) {
  let data = ''
  let options = {
    hostname: 'www.xiaomiyoupin.com',
    port: '443',
    path: '/mtop/market/cat/detail',
    method: 'post',
    Headers: {
      'Content-Type': 'application/json'
    }
  }
  let req = https.request(options, (res) => {
    res.on('data', chunk => {
      data += chunk
    })
    res.on('end', () => {
      console.log('data0', data)
      cb(data)
    })
  })
  req.write(JSON.stringify([{},{"catId":"60053904cff47e0001da16aa"}]))
  req.end()
}