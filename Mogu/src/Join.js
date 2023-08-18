import './Join.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Join () {
    const navigate = useNavigate();
    const baseUrl = "http://27.96.135.10:8090";
    // const baseUrl = "http://localhost:8090";

    const [info, setInfo] = useState({
        "loginId": '',
        "loginPassword": '',
        "userName": '',
        "userTel": ''
    });
    const [chkPw, setChkPw] = useState('');
    const [samePw, setSamePw] = useState(true);
    const [isIdOk, setIsIdOk] = useState(false); // 아이디 중복 확인 여부

    const [phoneAuth, setPhoneAuth] = useState(''); // 인증 번호
    const [userAuth, setUserAuth] = useState(''); // 사용자가 입력한 인증번호
    const [isAuthOpen, setIsAuthOpen] = useState(false); // 인증 번호 input open 여부
    const [isAuthOk, setIsAuthOk] = useState(false); // 휴대폰 인증 여부
    
    const onCheckId = async (e) => {
        if(info.loginId){
            setIsIdOk(false);
        } else{
            alert('아이디를 입력해주세요.');
            return;
        }
        
        const response = await axios.post(baseUrl + '/user/signUp/checkId', {
            "loginId": info.loginId
        }, {"Content-Type": "application/json"})
        console.log(response);
        if(response.data.code === 200){
            setIsIdOk(true);
            alert("사용 가능한 아이디입니다.");
        } else if(response.data.code === 201){
            alert("이미 존재하는 아이디입니다. 다시 입력하여주세요.");
        }
    };

    const onAuth = async (e) => {
        if(info.userTel){
            alert("인증번호가 전송되었습니다. 메시지를 확인하여 주세요.");
            setIsAuthOpen(true);
            setIsAuthOk(false);
            setUserAuth('');
        } else{
            alert('휴대폰 번호를 입력하세요.');
            return;
        }
        const response = await axios.post(baseUrl + '/user/signUp/sendSMS', {
            "phoneNumber": info.userTel
        }, {"Content-Type": "application/json"})
        console.log(response);
        if(response.data.code === 200){
            setPhoneAuth(response.data.result);
        }
    };

    const onAuthCheck = async (e) => {
        if(userAuth === phoneAuth){
            setIsAuthOk(true);
            alert("인증되었습니다.");
        } else{
            alert("인증번호가 일치하지 않습니다. 전화번호 인증을 다시 진행해주세요.");
            setUserAuth('');
        }
    }

    const posthData = async (e) => {
        console.log(info);
        if(!info.loginId){
            alert('아이디를 입력해주세요')
            return;
        } else if(!info.loginPassword){
            alert('비밀번호를 입력해주세요');
            return;
        } else if(!info.userTel){
            alert('휴대폰 번호를 입력해주세요');
            return;
        } else if(!info.userTel){
            alert('이름을 입력해주세요');
            return;
        }
        if(isIdOk && isAuthOk){
            const response = await axios.post(baseUrl + "/user/signUp", info, {"Content-type": "application/json"});
            console.log(response);
            if(response.data.code === 200){
                alert("회원가입 성공!");
                navigate("/login");
            }
        } else if(!isIdOk){
            alert("아이디 중복 확인을 진행해 주세요.");
        } else if(!isAuthOk){
            alert("휴대폰 인증을 진행해주세요.");
        }
    };

    return(
        <div className='join_main_wrapper'>
            <div className='join_wrapper'>
                <div className='join_txt'>회원가입</div>
                <div className='join_input_container'>
                    <div className='join_input_wrapper'>
                        <div className='join_subtitle'>아이디</div>
                        <div className='join_btn_wrapper'>
                            <input 
                                className='join_btn_input' 
                                placeholder='아이디' 
                                value={info.loginId}
                                onChange={(e) => setInfo((prev) => ({...prev, "loginId": e.target.value}))}
                            />
                            <div className='id_check' onClick={onCheckId}>중복 확인</div>
                        </div>
                    </div>
                    
                    <div className='join_input_wrapper'>
                        <div className='join_subtitle'>비밀번호</div>
                        <input 
                            className='join_input' 
                            placeholder='비밀번호'
                            type='password'
                            value={info.loginPassword}
                            onChange={(e) => setInfo((prev) => ({...prev, "loginPassword": e.target.value}))}
                        />
                        <input 
                            className='join_input' 
                            placeholder='비밀번호 확인'
                            type='password'
                            value={chkPw}
                            onChange={(e) => setChkPw(e.target.value)}
                        />
                        {info.loginPassword !== chkPw && (<div className='join_error'>비밀번호가 일치하지 않습니다.</div>)}
                    </div>

                    <div className='join_input_wrapper'>
                        <div className='join_subtitle'>휴대폰 번호 인증</div>
                        <div className='join_btn_wrapper'>
                            <input 
                                className='join_btn_input'  
                                placeholder='휴대폰 번호'
                                value={info.userTel}
                                onChange={(e) => setInfo((prev) => ({...prev, "userTel": e.target.value}))}
                            />
                            <div className='id_check' onClick={onAuth}>인증번호 받기</div>
                        </div>
                        
                        {isAuthOpen && (
                            <div className='join_btn_wrapper'>
                                <input 
                                    className='join_btn_input' 
                                    placeholder='인증번호 입력'
                                    value={userAuth}
                                    onChange={(e) => setUserAuth(e.target.value)}
                                />
                                <div className='id_check' onClick={onAuthCheck}>인증번호 확인</div>
                                
                            </div>
                        )}
                    </div>

                    <div className='join_input_wrapper'>
                        <div className='join_subtitle'>이름</div>
                        <input 
                            className='join_input' 
                            placeholder='이름' 
                            value={info.userName}
                            onChange={(e) => setInfo((prev) => ({...prev, "userName": e.target.value}))}
                        />
                    </div>

                    <button 
                        type='button'
                        className='join_btn'
                        onClick={posthData}
                    >가입하기</button>
                </div>
            </div>
        </div>
    );
}

export default Join;