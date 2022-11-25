const koa = require('koa')
let Router = require('koa-router')
const app = new koa()
let router = new Router()
let statics = require('koa-static')
let path = require('path')
const listRouter = require('./routes/list')
const bodyparse = require('koa-bodyparser')
const ejs = require('ejs')
const views = require('koa-views')
// ctx === context 上下文
// 路由前缀
app.use(bodyparse())
app.use(statics(path.join(__dirname, 'public'))) // path.join可以连接我们的绝对路径与相对路径，进行相对转义

// 配置模板引擎
app.use(views(path.join(__dirname, 'views'), {extension: 'ejs'}))
router.prefix('/api')
// 路由级别中间件
router.use('/', listRouter.routes(), listRouter.allowedMethods())
// 应用级别中间件
app.use(router.routes()).use(router.allowedMethods()) // 将路由注册成应用级别的中间件, 并在响应头添加允许的请求方式

app.listen(3000)