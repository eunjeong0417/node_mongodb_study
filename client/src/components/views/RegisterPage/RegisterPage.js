import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';


function RegisterPage(props) {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        

        if (password !== confirmPassword) {
            return alert('비밀번호가 일치하지 않습니다')
        }


        let body = {
            email: email,
            name:name,
            password:password
        }


        
        dispatch(registerUser(body))
            .then(res => {
                if (res.payload.success) {
                props.history.push('/login')
                } else {
                    alert('error')
            //register 성공 후 history push
            //사용하여 시작페이지로 이동
            }
        })

    }
    return (
        <div>
             <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                
                <br />
                
            <button type="submit">Register</button>
        
            </form>
        </div>
    )
}

export default  withRouter(RegisterPage);
