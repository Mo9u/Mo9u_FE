import './Login.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import user from './img/icon/user.png';

function Login () {
    const navigate = useNavigate();
    const [cookies, setCookies, removeCookies] = useCookies(["sessionID"]);

    const [info, setInfo] = useState({
        "loginId": '',
        "loginPassword": '',
    });

    const baseUrl = "http://27.96.135.10:8090";
    // const baseUrl = "http://localhost:8090";

    const fetchData = async (e) => {
        console.log(info);
        try {
            const response = await axios.post(baseUrl + "/user/login", info, {"Content-Type": "application/json"});
            console.log(response);
            if(response.status === 200){
                setCookies("sessionID", response.data.result);
                window.localStorage.setItem("sessionID", response.data.result);
                navigate("/");
            }
        } catch (error){
            console.log(error);
            if(error.response.status === 401){
                alert("아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력하여 주세요.");
                setInfo({loginId: '', loginPassword: ''});
            }
        }
        
    }

    const logout = async (e) => {
        // axios.defaults.withCredentials = true;
        // console.log(cookies.sessionID);
        // const config = {
        //     headers: {
        //         "Accept": "/",
        //         "Cache-Control": "no-cache",
        //         "Cookie": `JSESSIONID=${cookies.sessionID}`
        //     }
        // };

        // try{
        //     const response = await axios.get(baseUrl + "/user/logout", config);
        //     console.log(response);
        // } catch (error) {
        //     console.error(error);
        // }
        window.localStorage.clear();
        
    }
    return(
        <div className='login_main_wrapper'>
            <div className='login_wrapper'>
                <div className='login_icon_wrapper'>
                    <img src={user} width='86px' height='86px'/>
                </div>
                <div className='login_txt'>로그인</div>
                <div className='login_input_wrapper'>
                    <input 
                        className='login_input' 
                        placeholder='아이디' 
                        value={info.loginId}
                        onChange={(e) => setInfo((prev) => ({...prev, "loginId": e.target.value}))}
                    />
                    <input 
                        className='login_input' 
                        placeholder='비밀번호'
                        value={info.loginPassword}
                        onChange={(e) => setInfo((prev) => ({...prev, "loginPassword": e.target.value}))}
                    />
                    <button 
                        type='button'
                        className='login_btn'
                        onClick={fetchData}
                    >로그인</button>
                </div>
                <div className='login_signUp'>계정이 없으신가요? <Link className='login_link' to='/join'>회원가입</Link></div>
                <div onClick={logout}>로그아웃</div>
            </div>
        </div>
    );
}

export default Login;