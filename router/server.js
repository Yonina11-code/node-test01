const http = require('http')
let Router = {}
function use (router) {
  Object.assign(Router, router)
}
function start () {
  http.createServer((req,res) => {
    const myurl = new URL(req.url, 'http://127.0.0.1')
    console.log(myurl.pathname)
    try {
      Router[myurl.pathname](req, res)
    } catch (err) {
      Router['/404'](req, res)
    }
    // router[myurl.pathname](res)
  }).listen(3000, () => {
    console.log('serve start')
  })
}
module.exports = {
  start,
  use
}
//
// exports.start = start

// exports.use = use