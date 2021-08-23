import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

function LoginPage(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        
        let body = {
            email: email,
            password:password
        }

        dispatch(loginUser(body))
            .then(res => {
                if (res.payload.loginSuccess) {
                props.history.push('/')
                } else {
                    alert('error')
            //login 성공 후 history push
            //사용하여 시작페이지로 이동
            }
        })

    }


    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <br />
                
            <button type="submit">Login</button>
        
            </form>
        </div>
    )
}

export default withRouter(LoginPage);
