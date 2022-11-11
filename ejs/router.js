const express = require('express')
const router = express.Router()
// 路由级别中间件

router.get('/', (req, res) => {
  let query = req.query // 获取路由参数
  res.render('login') // 找views文件夹下的login.ejs render函数用于渲染模版(render只能渲染模板)
  // res.json() // 只能渲染json
})
router.post('/', (req, res) => {
  let params = req.body // 获取参数
  res.send({
    ok: 1
  })
})
router.post('/login/validate', (req, res) => {
  console.log(req.body)
  // res.send({'login': req.body })
  res.redirect('home')
})
module.exports = router