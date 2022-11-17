const Book = require('../models/book');

exports.index = (req, res) => { res.send('未实现：站点首页'); };

exports.book_create_get = (req, res) => {
  res.send('book_create_get')
}

exports.book_create_post = (req, res) => {
  res.send('book_create_post')
}

exports.book_delete_get = (req, res) => {
  res.send('book_delete_get')
}

exports.book_delete_post = (req, res) => {
  res.send('book_delete_post')
}

exports.book_update_get = (req, res) => {
  res.send('book_update_get')
}

exports.book_update_post = (req, res) => {
  res.send('book_update_post')
}

exports.book_detail = (req, res) => {
  res.send('book_detail')
}

exports.book_list = (req, res) => {
  res.send('book_list')
}
