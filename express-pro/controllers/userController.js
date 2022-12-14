
const userService = require('../services/userService')
const jwt = require('../util/jwt')
const userController = {
  addUser: async (req, res) => {
    const { username, password, age } = req.body
    await userService.addUser(username, password, age).then(res => {
      console.log('add', res)
    })
    res.send({
      ok: 1
    })
  },
  list: async (req, res) => {
    const { page = 1, limit = 10 } = req.query
    // skip().limit() 从第几条开始到第几条
    await userService.list(page, limit).then(data => {
      res.send(data)
    })
  },
  update: async (req, res) => {
    // console.log(req.body, req.params.id)
    const { username, password, age } = req.body
    await userService.update(username, password, age, req.params.id).then(data => {
      // console.log(data)
      res.send({
        ok: 1
      })
    })
  },
  delete: async (req, res) => {
    userService.delete(req.params.id).then(data => {
      res.send({
        ok: 1
      })
    })
  },
  login: async (req, res) => {
    const { username, password } = req.body
    const data = await userService.login(username, password)
    if (data.length === 0) {
      res.send({
        ok: 0
      })
    } else {
      // 设置token
      const token = jwt.generate({
        _id: data[0]._id,
        username: data[0].username
      }, '1h')
      // token返回在header
      res.header('Authorization', token)
      res.send({
        ok: 1
      })
    }
  }
}
module.exports = userController