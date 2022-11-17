const userModel = require('../models/user')
const userService = {
  addUser: (username, password, age) => {
    return userModel.create({
      username,
      password,
      age
    }).then(data => {
      console.log(data)
    })
  }
}
module.exports = userService