const express = require('express')
const app = express()

app.get('/', (req, res, next) => {
  // 校验token
  if (true) {
    next()
  } else {
    res.send('error')
  }
}, (req, res) => {
  res.send({ list: [1,2,3] })
})

let cb0 = function (req, res, next) {
  console.log('cb0')
  next()
}

let cb1 = function (req, res, next) {
  console.log('cb1')
  next()
}

let cb2 = function (req, res, next) {
  console.log('cb2')
}
app.get('/example/c', [cb0, cb1, cb2])

app.get('/login', (req, res) => {
  res.send('login') // send 方法把write与end进行了封装
})
app.get('/404', (req, res) => {
  res.send(`
    <html>
      <h1>hello world</h1>
    </html>
  `) // send 方法也可以解析html 而不用传头信息
})


// d可写可不写
app.get('/abcd?', (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})
// /:id 即id是什么值都可以响应, 但是不能省略
app.get('/bc/:id', (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})
// /:id/:id2 两个随机数的格式
app.get('/bc/:id/:id2', (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})

// b+ b可以匹配n次
app.get('/ab+cd', (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})

// b* b 与 c 之间可以输入任意字符
app.get('/ab*cd', (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})
// 也可以使用正则表达式匹配路径
// 要以fly结尾的
app.get(/.*fly$/, (req, res) => {
  res.send({
    name: 'yxy',
    age: 100
  }) // send 方法也可以直接传送对象而不用解析成字符串
})


app.listen(3001, () => {
  console.log('server start')
})