const express = require('express')
//express 모듈을 가져온다
const app = express()
//express로 app을 만든다
const port = 4000
//port는 5000으로 설정
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})