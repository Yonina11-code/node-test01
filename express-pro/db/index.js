const mongoose = require('mongoose')

// 连接
const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB)

// 让mongoose使用全局的promise库
mongoose.Promise = global.Promise
// 取得默认连接
const db = mongoose.connection

// 将连接与错误事件绑定
db.on('error', console.error.bind(console, 'MongoDB 连接错误'))