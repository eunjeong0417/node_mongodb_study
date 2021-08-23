import axios from "axios";
import {LOGIN_USER,REGISTER_USER} from './types'

export function loginUser(dataSubmit) {

    const request = axios.post('/api/users/login', dataSubmit)
        .then(res => res.data)
    //서버에서 받아온 데이터를
    //request에 저장한다
    //reducer로 데이터를 보내준다

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataSubmit) {

    const request = axios.post('/api/users/register', dataSubmit)
        .then(res => res.data)
    //서버에서 받아온 데이터를
    //request에 저장한다
    //reducer로 데이터를 보내준다

    return {
        type: REGISTER_USER,
        payload: request
    }
}