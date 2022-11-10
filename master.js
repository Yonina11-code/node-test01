const fs = require('fs')
const child_process = require('child_process')

for (let i = 0; i < 3; i++) {
  let workerProcess = child_process.exec('node support.js' + i, function (err, stdout, stderr) {
    if (err) {
      console.log(err.stack)
      console.log('Error code' + err.code)
      console.log('Signal received: '+ err.signal)
    }
    console.log('stdout:' + stdout)
    console.log('stderr:' + stderr)
  })
  workerProcess.on('exit', function (code) {
    console.log('子进程已退出， 退出吗' + code)
  })
}