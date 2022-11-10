let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
})
connection.connect()

let addSql = 'insert into websites(Id, name, url, alexa, country) VALUES(0, ?,?,?,?)'
let addSqlOarams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN']
// add
connection.query(addSql, addSqlOarams, function (err, result) {
  if (err) {
    console.log('[insert error] - ', err.message)
    return
  }
  console.log('------------insert---------------')
  console.log('INSERT ID:', result.insertId)
  console.log('---------------------------------------\n\n')
})

connection.end()