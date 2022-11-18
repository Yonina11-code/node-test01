var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let loginRouter = require('./routes/login')
const cataloRouter = require('./routes/catalog')
const compression = require('compression')
const helmet = require('helmet')

let session = require('express-session')
var app = express();

app.use(helmet())
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
  saveUninitialized: true // 一开始就会生成cookie
}))

// 设置中间件， session过期校验
app.use((req, res, next) => {
  // 排除login相关的路由与接口
  if (req.url.includes('login')) {
    next()
  } else if (req.session.user) {
    next()
  } else {
    // 是接口，返回错误码
    // 不是接口，就重定向
    req.url.includes('api') ? res.status(401).send({ ok: 0}) : res.redirect('/login')
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
