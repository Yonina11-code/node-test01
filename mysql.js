let mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test'
})
connection.connect()
// connection.query('SeLECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error
//   console.log('The solution is: ', results[0].solution)
// })

let sql = 'SELECT * FROM websites'
connection.query(sql, function (err, result) {
  if (err) {
    console.log('[select from ] -', err.message)
    return
  }

  console.log('----------select-------------')
  console.log(result)
  console.log('-----------------------\n\n')
})

connection.end()