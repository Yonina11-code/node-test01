var express = require('express');
var router = express.Router();
const userModel = require('../models/user')
const userController = require('../controllers/userController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('你好酷');
});

router.post('/user/add', userController.addUser)
router.post('/user/update/:id', userController.update)

router.get('/user/delete/:id', userController.delete)

router.get('/user/list', userController.list)

router.post('/login', userController.login)
module.exports = router;
