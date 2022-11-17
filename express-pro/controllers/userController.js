const userService = require('../services/userService')
const userController = {
  addUser: async (req, res) => {
    const { username, password, age } = req.body
    await userService.addUser(username, password, age)
    res.send({
      ok: 1
    })
  }
}
module.exports = userController