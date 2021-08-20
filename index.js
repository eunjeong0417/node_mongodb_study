const express = require('express')
//express 모듈을 가져온다
const app = express()
//express로 app을 만든다
const port = 4000
//port는 5000으로 설정
const { User } = require("./models/User")
const bodyParser = require('body-parser');

//bodyParser는 client에서 받아온 정보를
//서버에서 분석할 수 있도록 해준다

app.use(bodyParser.urlencoded({ extended: true }));
//application/x-www.form-urlencoded
app.use(bodyParser.json());
//application/json

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://eunjeong:abcd1234@node2.s7g4b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    }).then(() => console.log('mongoDB Connected'))
    //db연결 성공
    .catch(err => console.log(err))
    //에러 발생할경우

app.get('/', (req, res) => {
  res.send('Hello! 안녕하세요')
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




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})