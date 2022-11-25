let Router = require('koa-router')
let router = new Router()
router.get('/list', (ctx, next) => {
  ctx.body = ['1,2,3,4', '23']
})
module.exports = router