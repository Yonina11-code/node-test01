function render (res, data, type) {
  res.writeHead(200, {"Content-Type": `${type ? type : 'application/json'}; charset=utf8` })
  res.write(data)
  res.end()
}
const apiRouter = {
  '/api/login': (req, res) => {
    // 获取参数
    const myurl = new URL(req.url, 'http://127.0.0.1') // (当前路径， 当前域名)
    searchParams = myurl.searchParams // 获取到拼接在请求路径上的参数
    // 。。。
    render(res, '{ ok: 1 }')
  },
  '/api/loginpost': (req, res) => {
    let post = ''
    req.on('data', chunk => { // post获取参数一般是通过事件监听机制去获取，因为post中接收到的参数可能很大，通过chunk的方式一点一点接收
      post += chunk
    })
    req.on('end', () => {
      console.log(post)
      render(res, '{ ok: 1 }')
    })
  }
}
module.exports = apiRouter