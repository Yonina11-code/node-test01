let events = require('events')
// 创建eventEmitter对象
let eventEmitter = new events.EventEmitter()
// 创建事件处理程序
let connectHanlder = function connected () {
  console.log('连接成功')
  eventEmitter.emit('data_received')
}
// 绑定connection 事件处理程序
eventEmitter.on('connection', connectHanlder)

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function () {
  console.log('数据接收成功')
})
eventEmitter.emit('connection')
console.log('程序执行完毕')