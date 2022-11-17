var express = require('express');
var router = express.Router();
const userModel = require('../models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('你好酷');
});

router.post('/user/add', (req, res) => {
  const { username, password, age } = req.body
  userModel.create({
    username,
    password,
    age
  }).then(data => {
    console.log(data)
  })
  res.send({
    ok: 1
  })
})
router.post('/user/update/:id', (req, res) => {
  console.log(req.body, req.params.id)
  const { username, password, age } = req.body
  userModel.updateOne({_id: req.params.id }, {
    username,
    password,
    age
  }).then(data => {
    console.log(data)
    res.send({
      ok: 1
    })
  })
})

router.get('/user/delete/:id', (req, res) => {
  userModel.deleteOne({
    _id: req.params.id
  }).then(data => {
    res.send({
      ok: 1
    })
  })
})

router.get('/user/list', (req, res) => {
  const { page = 1, limit = 10 } = req.query
  // skip().limit() 从第几条开始到第几条
  userModel.find({}, ['username', 'age']).sort({ age: 1 }).skip((page - 1) * limit).limit(limit).then(data => {
    res.send(data)
  })
})

module.exports = router;
