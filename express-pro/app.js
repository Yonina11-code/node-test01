var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoStore = require('connect-mongo') // 用于将session存储在数据库中

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./routes/login')
const cataloRouter = require('./routes/catalog')
const compression = require('compression')
const helmet = require('helmet')
var csp = require('helmet-csp')
let session = require('express-session')
let jwt = require('./util/jwt')
var app = express()
app.use(helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    // 默认的资源白名单
    defaultSrc: ["'self'", 'unpkg.com'],
    // 允许的脚本资源：本站点、cdn.bootcss.com、hm.baidu.com、inline资源（常见的style属性,onclick,inline js和inline css等等）
  scriptSrc: ["'self'", 'unpkg.com'],
  // 允许的样式文件资源
  styleSrc: ["'self'", "'unsafe-inline'", '*'],
  // 允许的图片文件资源，因为我们要上传图片到非本站的服务器，所以添加了类似*.yiqiniu.com:*这样的描述，否则无法访问上传后的图片
  imgSrc: ["'self'", 'data:', '*'],
  objectSrc: ["'none'"]
},
// 设为true后上述的规则不起作用，只会打印出信息
reportOnly: false,
//如果设置true, 将会添加已经被抛弃的兼容头部 X-WebKit-CSP, and X-Content-Security-Policy
setAllHeaders: false,
disableAndroid: false,
browserSniff: true
}));
app.use(compression())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'system',
  secret: '123456',
  cookie: {
    maxAge: 1000 * 60 * 60, //1h
    secure: false
  },
  resave: true, //1h空闲时间
  saveUninitialized: true, // 一开始就会生成cookie
  store: mongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/yxt_session',
    ttl: 1000 * 60 * 10
  })
}))

// 设置中间件， session过期校验
app.use((req, res, next) => {
  console.log('req.url', req.url)
  console.log(req.headers)
  // 排除login相关的路由与接口
  if (req.url.includes('login')) {
    next()
  } else {
    // 是接口，返回错误码
    // 不是接口，就重定向
    let authorization = req.headers && req.headers.authorization
    if (authorization) {
      if (jwt.verify(authorization)) {
        const newtoken = jwt.generate({
          _id: authorization._id,
          username: authorization.username
        }, '10s')
        res.header('Authorization', newtoken)
        next()
      } else {
        req.url.includes('api') ? res.status(401).send({ ok: 0 }) : res.redirect('/login')
      }
    } else {
      next()
    }
  }
})
app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/catalog', cataloRouter)
app.use('/login', loginRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
