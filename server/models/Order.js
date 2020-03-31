const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    city: {
        type: String
    },
    room: {
        type: String
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    user: {
        type: String
    }
})

module.exports = User = mongoose.model('location', OrderSchema)
