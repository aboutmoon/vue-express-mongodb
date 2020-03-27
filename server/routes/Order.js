const express = require('express')
const locations = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../config')

const Order = require('../models/Order')
locations.use(cors())

locations.post('/order', (req, res) => {
  res.json({error: 'User already exists'})
})

locations.get('/order', (req, res) => {
  res.json({error: 'User already exists'})
})

module.exports = locations
