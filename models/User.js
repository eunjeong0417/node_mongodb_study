const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//10자리 salt를 만들어 암호화한다
const jwt = require('jsonwebtoken');


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

//mongoose method(pre)사용해서
//user 정보가 저장되기 전에
//비밀번호 암호화하기
userSchema.pre('save', function (next) {
    var user = this;

    //비밀번호를 바꿀때만 bcrypt실행
    if (user.isModified('password')) {

    //salt생성하기(암호화)
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)
        
        //hash는 암호화된 비밀번호
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
    } else {
        next()                                 
    }
})

userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainpassword를 db에 있는 암호화된
    //패스워드와 비교하기 위해서는
    //plainpassword를 암호화해서 비교해야함
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function (cb) {
    var user = this;
    //jsonwebtoken으로 token생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken');
    //만든 토큰을 user의 
    //token field에 넣기
    user.token = token
    user.save(function (err, user) {
        if (err) return (err)
        cb(null, user)
    })
}

//mongoose model로 schema를 감싸준다
const User = mongoose.model('User', userSchema)
module.exports = { User }
//module exports