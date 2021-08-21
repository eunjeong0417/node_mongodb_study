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

app.use(bodyParser.urlencoded({ extended: true }));
//application/x-www.form-urlencoded
//클라이언트에서 받아온 form parsing
app.use(bodyParser.json());
//application/json

const mongoose = require('mongoose');

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => console.log('mongoDB Connected'))
    //db연결 성공
    .catch(err => console.log(err))
    //에러 발생할경우

app.get('/', (req, res) => {
  res.send('Hello! g')
})


//회원가입 페이지 만들기
app.post('/register', (req, res) => {
    //회원가입시 필요한 정보를
    //데이터 베이스에 저장
    const user = new User(req.body)

    //mongodb method
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success:true
        })
    })
    
})


app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 찾는다
  //몽고디비 메소드인 findOne 사용
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message:"이메일이 일치하지 않습니다."
      })
    }  //데이터베이스에 이메일이 있다면
  //비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch))
    if (!isMatch)
      return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
    
    user.generateToken((err, user) => {
      
    })

  })






  //비밀번호까지 맞다면
  //user token 생성
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})