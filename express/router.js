const express = require('express')
const router = express.Router()
// 路由级别中间件

router.get('/', (req, res) => {
  let query = req.query // 获取路由参数
  res.send(query)
})

router.get('/login', (req, res) => {
  res.send('login')
})
module.exports = router