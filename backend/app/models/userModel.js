const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    newPassword: {
        type: String,
        minLength: 8,
        maxLength: 128
    },
    confirmNewPassword: {
        type: String,
        minLength: 8,
        maxLength: 128
    },
    role: {
        type: String,
        required: true,
        enum: ['user'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User
