const fs = require('fs')

// 创建目录
fs.mkdir('./avatar', (err) => {
  console.log(err)
  if (err && err.code === 'EEXIST') {
    console.log('目录已经存在')
  }
})

// // 重命名文件名称
// fs.rename('./avatar', './avatar2', (err) => {
//   console.log(err)
//   if (err && err.code === 'ENOENT') {
//     console.log('目录不存在')
//   }
// })

// 删除文件， 如果要删除的文件里有内容则无法删除成功
// fs.rmdir('./avatar2', (err) => {
//   console.log(err)
//   if (err && err.code === 'ENOENT') {
//     console.log('目录不存在')
//   }
// })

// 写入文件
fs.writeFile('./avatar/a.txt', 'hello/world', (err) => {
  console.log(err)
}) // 文件可以没有，没有会自动创建。 如果有文件会把文件之前的内容覆盖掉

// 追加文件内容
fs.appendFile('./avatar/a.txt', '您好', err => {
  console.log(err)
})

// 读取文件内容
fs.readFile('./avatar/a.txt', (err, data) => {
  // 读取的文件内容是buffer对象
  console.log(data.toString('utf-8'))
})
// 或

fs.readFile('./avatar/a.txt','utf-8', (err, data) => {
  // 读取的文件内容是buffer对象
  console.log(data)
})

// 删除文件
fs.unlink('./avatar/a.txt', err => {
  console.log(err)
})

// 读取目录
fs.readdir('./avatar', (err, data) => {
  if (!err) {
    console.log(data) // 输出目录的列表
    // 删除目录中的文件
    data.forEach(item => {
      fs.unlink(`./avatar/${item}`, err => {
        console.log(err)
      })
    })
  }
})

// 判断文件的类型（文件、文件夹...）
fs.stat('./avatar', (err, data) => {
  console.log(data.isFile()) // 是否为文件
  console.log(data.isDirectory()) // 是否为目录（文件夹）
})


// 异步读取文件
const fs = require('fs').promises
fs.readFile('./avatar2/a.txt', 'utf-8').then(result => {
  console.log(result)
})

fs.readdir('./avatar').then(async data => {
  if (!err) {
    await Promise.all(data.map(item => fs.unlink(`./avatar/${item}`)))
    await fs.rmdir('./avatar')
  }
})
