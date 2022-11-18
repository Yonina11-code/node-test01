const userModel = require('../models/user')
const userService = {
  addUser: (username, password, age) => {
    return userModel.create({
      username,
      password,
      age
    })
  },
  list: (page, limit) => {
   return userModel.find({}, ['username', 'age']).sort({ age: 1 }).skip((page - 1) * limit).limit(limit)
  },
  update: (username, password, age, id) => {
    return userModel.updateOne({_id: id }, {
      username,
      password,
      age
    })
  },
  delete: (id) => {
    return userModel.deleteOne({
      _id: id
    })
  },
  login: (username, password) => {
    return userModel.find({ username, password })
  }
}
module.exports = userService