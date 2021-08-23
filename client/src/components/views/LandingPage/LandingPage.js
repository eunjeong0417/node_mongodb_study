import React,{useEffect} from 'react';
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello').then(res => { console.log(res) })
    },[])

    return (
        <div>
            <h2>시작페이지</h2>
        </div>
    )
}

export default LandingPage;
