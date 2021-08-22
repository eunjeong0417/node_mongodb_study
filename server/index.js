const express = require('express')
//express 모듈을 가져온다
const app = express()
//express로 app을 만든다
const port = 4000
//port는 5000으로 설정
const { User } = require("./models/User");
const bodyParser = require('body-parser');
//bodyParser는 client에서 받아온 정보를
//서버에서 분석할 수 있도록 해준다
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/auth');



app.use(bodyParser.urlencoded({ extended: true }));
//application/x-www.form-urlencoded
//클라이언트에서 받아온 form parsing
app.use(bodyParser.json());
//application/json
app.use(cookieParser());



const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => console.log('mongoDB Connected'))
    //db연결 성공
    .catch(err => console.log(err))
    //에러 발생할경우

app.get('/', (req, res) => {
  res.send('Hello! ')
})


//회원가입 페이지 만들기
app.post('/api/users/register', (req, res) => {
    //회원가입시 필요한 정보를
    //데이터 베이스에 저장
    const user = new User(req.body)

    //user 정보 저장 전에
    //bcrypt로 비밀번호 암호화하기

    //mongodb method
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success:true
        })
    })
    
})


app.post('/api/users/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다
  //몽고디비 메소드인 findOne 사용
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message:"이메일이 일치하지 않습니다."
      })
    }
  //데이터베이스에 이메일이 있다면
  //비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 일치하지 않습니다." })
  
    //이메일과 비밀번호가 모두 일치한다면
    //token 생성하기
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);

      //토큰은 쿠키에 저장
      res.cookie("x_auth", user.token)
        .status(200)
      .json({loginSuccess:true, userId:user._id})
    })

    })
    

  })
})

app.get('/api/users/auth', auth, (req, res) => {
  //authentication 통과

  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image:req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {
  //findOneAndUpdate사용해서
  //유저를 찾고 업데이트 시켜준다


  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success:true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})