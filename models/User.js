const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

userSchema.pre('save', function (next) {
    const user = this;

    //비밀번호를 바꿀때만 bcrypt실행
    if (user.isModified('password')) {
            //salt생성하기(암호화)
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
    }
})

//mongoose model로 schema를 감싸준다
const User = mongoose.model('User', userSchema)
module.exports = { User }
//module exports