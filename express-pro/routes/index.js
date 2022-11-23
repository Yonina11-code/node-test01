var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.redirect('/catalog')
  // if (req.session.user) {
    res.render('index', { title: 'Express' });
  // } else {
  //   res.redirect('/login')
  // }
});

// 测试
var jwt = require('jsonwebtoken')
var token = jwt.sign({ foo: 'bar' }, 'yxt', { expiresIn: 10000 });
console.log('token', token)
let decode = jwt.verify(token, 'yxt')
console.log('decode', decode)
module.exports = router;
