const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

const mongoURI = 'mongodb://localhost:27017/reservation'

mongoose.connect(mongoURI, {useNewUrlParser: true})
    .then(() => console.log('connected.'))
    .catch((err) => console.log(err))

const Users = require('./routes/User')

app.use('/api/users', Users)

app.listen(port, function () {
    console.log('server is running on port: ' + port)
})
