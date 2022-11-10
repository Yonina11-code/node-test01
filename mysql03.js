let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
})
connection.connect()

let modSql ='UPDATE websites SET name = ?, url = ? WHERE Id = ?'
let modSqlParams = ['菜鸟移动站', 'https://m.runoob.com', 6]
// update
connection.query(modSql, modSqlParams, function (err, result) {
  if (err) {
    console.log('[update error] - ', err.message)
    return
  }
  console.log('------------update---------------')
  console.log('UPDATE affectedRows:', result.affectedRows)
  console.log('---------------------------------------\n\n')
})
// del
let delsql = 'delete from websites where id=6'
connection.query(delsql, function(err, result) {
  if (err) {
    console.log('[delete error] -', err.message)
    return
  }
  console.log('--------------delete----------------')
  console.log('delete affectedRows', result.affectedRows)
  console.log('---------------------------------------\n\n')
})
connection.end()