import './Join.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Join () {
    const [info, setInfo] = useState({
        "joinId": '',
        "joinPassword": '',
    });

    const baseUrl = "http://27.96.135.10:8090";

    const fetchData = async (e) => {
        console.log(info);
        const response = await axios.post("/user/join", info, {"Content-type": "application/json"}, {withCredentials: true});
        console.log(response);
    }
    return(
        <div className='join_main_wrapper'>
            <div className='join_wrapper'>
                <div className='join_txt'>회원가입</div>
                <div className='join_input_container'>
                    <div className='join_input_wrapper'>
                        <div className='join_subtitle'>아이디</div>
                        <input 
                            className='join_input' 
                            placeholder='아이디' 
                            onChange={(e) => setInfo((prev) => ({...prev, "joinId": e.target.value}))}
                        />
                    </div>
                    
                    <div>
                        <div>비밀번호</div>
                        <input 
                            className='join_input' 
                            placeholder='비밀번호'
                            onChange={(e) => setInfo((prev) => ({...prev, "joinPassword": e.target.value}))}
                        />
                        <input 
                            className='join_input' 
                            placeholder='비밀번호 확인'
                            onChange={(e) => setInfo((prev) => ({...prev, "joinPassword": e.target.value}))}
                        />
                    </div>

                    <div>
                        <div>전화번호 인증</div>
                        <input 
                            className='join_input' 
                            placeholder='휴대폰 번호'
                            onChange={(e) => setInfo((prev) => ({...prev, "joinPassword": e.target.value}))}
                        />
                        <input 
                            className='join_input' 
                            placeholder='인증번호 입력'
                            onChange={(e) => setInfo((prev) => ({...prev, "joinPassword": e.target.value}))}
                        />
                    </div>

                    <button 
                        type='button'
                        className='join_btn'
                        onClick={fetchData}
                    >가입하기</button>
                </div>
            </div>
        </div>
    );
}

export default Join;