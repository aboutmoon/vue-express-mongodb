const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req,res,next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (token && jwt.verify(token, config.secret)) {
    next()
  } else {
    return res.status(401).send({
      message: 'Missing token',
    })
  }
}
