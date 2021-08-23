import React,{useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello').then(res => { console.log(res) })
    },[])

    const clickHandler = () => {
        axios.get('/api/users/logout')
            .then(res => {
                if (res.data.success) {
                props.history.push('/login')
                } else {
                    alert('로그아웃 실패')
            }
        })
    }

    return (
        <div>
            <h2>시작페이지</h2>

            <button onClick={clickHandler}>로그아웃</button>
        </div>
    )
}

export default withRouter(LandingPage);
