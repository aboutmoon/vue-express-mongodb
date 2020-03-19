const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const User = require('../models/Users')
users.use(cors())

// const checkToken = (req, res) => {
//   let token = req.headers['x-access-token'] || req.headers['authorization']
//
//   if (token.startsWith('Bearer ')) {
//     token = token.slice(7, token.length)
//   }
//
//   if (token) {
//     jwt.verify(token, )
//   }
// }

users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        name: req.body.name,
        email: req.body.email,
        created: today
    }

    User.findOne({
        email: req.body.email
    })
        .then(user => {
            if (!user) {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash
                    User.create(userData)
                        .then(user => {
                            res.json({message: user.email + 'registered'})
                        })
                        .catch(err => {
                            res.send('error: ' + err)
                        })
                })
            } else {
                res.json({error: 'User already exists'})
            }
        })
})

users.post('/login', (req, res) => {
    User.findOne({
        email: req.body.email
    })
        .then((user) => {
           if (user && req.body.password) {
               if (bcrypt.compareSync(req.body.password, user.password)) {
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
               } else {
                   res.json(401, {error: 'User does not exist'})
               }
           } else {
               res.json(401, {error:'User does not exist'})
           }
        })
        .catch(err => {
            res.send('error: ' + err)
        })
})

users.post('/login', (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (user && req.body.password) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
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
        } else {
          res.json(401, {error: 'User does not exist'})
        }
      } else {
        res.json(401, {error:'User does not exist'})
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
