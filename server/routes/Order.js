const express = require('express')
const locations = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')
const Order = require('../models/Order')

locations.use(cors())

locations.post('/order', (req, res) => {
  const orderData = {
    city: req.body.city,
    room: req.body.room,
    start: req.body.start,
    end: req.body.end,
    user: req.body.user
  }
  let order = Order.create(orderData)
  res.status(200).json({error: 'User 1already exists'})
})

locations.get('/order', (req, res) => {
  res.json({error: 'User already exists'})
})

module.exports = locations
