const mongoose = require('mongoose')


//mongoose로 스키마 생성
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength:30
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    password: {
        type: String,
        minlength:5
    },
    lastname: {
        type: String,
        maxlength:30
    },
    role: {
        type: Number,
        default:0
    },
    image: String,
    token: {
        type:String
    },
    //token사용기간
    tokenExp: {
        type:Number
    }
})
//mongoose model로 schema를 감싸준다
const User = mongoose.model('User', userSchema)
module.exports = { User }
//module exports