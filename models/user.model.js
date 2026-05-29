const mongoose = require('mongoose')

const userUsecham = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
         type: String,
         enum: ['user', 'admin'],
         default: 'user'
    },
   
    isVerified: {
        type: Boolean,
        default: false,
    }

}, {timestamps: true})

module.exports = mongoose.model('User', userUsecham)