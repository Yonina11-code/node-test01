var JWT = require('jsonwebtoken')
const secret = 'yxt-anydata'
const jwt = {
  generate (value, expires) {
    return JWT.sign(value, secret, { expiresIn: expires })
  },
  verify (token) {
    try {
      return JWT.verify(token, secret)
    } catch (error) {
      return false
    }
  }
}

module.exports = jwt