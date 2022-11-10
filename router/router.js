const fs = require('fs')
const path = require('path') //
const mime = require('mime')
// function router (res,pathname) {
//   switch(pathname) {
//     case '/login':
//       res.writeHead(200, {"Content-Type": "text/html; charset=utf8" })
//       res.write(fs.readFileSync('./static/login.html'), 'utf-8')
//       break
//     case '/home':
//       res.writeHead(200, {"Content-Type": "text/html; charset=utf8" })
//       res.write(fs.readFileSync('./static/home.html'), 'utf-8')
//       break
//     default:
//       res.writeHead(200, {"Content-Type": "text/html; charset=utf8" })
//       res.write(fs.readFileSync('./static/404.html'), 'utf-8')
//   }
// }
function render (res, path, type) {
  res.writeHead(200, {"Content-Type": `${type ? type : 'text/html'}; charset=utf8` })
  res.write(fs.readFileSync(path), 'utf-8')
}
const  router = {
    '/login': (req, res) => {
      render(res, './static/login.html')
    },
    '/home': (req, res) => {
      render(res, './static/home.html')
    },
    '/404': (req, res) => {
      // 判断是不是静态资源文件
      if (readStaticFile(req, res)) {
        return
      }
      res.writeHead(200, {"Content-Type": "text/html; charset=utf8" })
      res.write(fs.readFileSync('./static/404.html'), 'utf-8')
    },
    '/favicon.ico': (req, res) => {
      render(res, './static/favicon.ico', 'image/x-icon')
    }
}
// 静态资源管理
function readStaticFile (req, res) { // 判断是否是静态资源文件
  // 获取路径
  const myurl = new URL(req.url, 'http://127.0.0.1:3000')
  console.log('readStaticFile', mime.getType(myurl.pathname.split('.')[1]), path.join(__dirname, 'static', myurl.pathname))
  // __dirname 可以获取到当前项目运行的路径
  let staticPath = path.join(__dirname, '/static', myurl.pathname) // path 这个模块可以帮助我们根据系统拼接正确的路径
  if (fs.existsSync(staticPath)) {
    console.log('type', staticPath.split('.')[1])
    render(res, staticPath, mime.getType(myurl.pathname.split('.')[1])) // mime 这个插件可以帮助获取文件的类型
    return true
  } else {
    return false
  }
}
module.exports = router