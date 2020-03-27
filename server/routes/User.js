const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const ldapAuth = require('../utils/LdapAuth')
const config = require('../config')

const User = require('../models/Users')
users.use(cors())

users.post('/login', (req, res) => {
  if (req.body.email && req.body.password) {
    ldapAuth(req.body)
      .then(data => {
        User.findOne({email: req.body.email}, function (err, user) {
          if (!user) {
            const today = new Date()
            const userData = {
              name: req.body.email,
              email: req.body.email,
              created: today
            }
            user = User.create(userData)
          }
          console.log(user)
          const payload = {
            _id: user._id,
            name: user.name,
            email: user.email
          }

          let token = jwt.sign(payload, config.secret, {
            expiresIn: 1440
          })

          res.send({
            data: {
              token: token
            }
          })
        })




      })
      .catch(err => {
        res.status(401).json({error: err.message})
      })
  } else {
    res.json(401, {error: 'username or password not correct'})
  }
})

module.exports = users
