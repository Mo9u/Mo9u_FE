import './SubList.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from "recoil";
import SubManageCard from './components/SubManageCard';
import axios from 'axios';

import notification from './img/icon/notifications.png';
import question from './img/icon/question.png';

import { LoginState } from "./states/LoginState";

function SubList () {
    // const baseUrl = "http://localhost:8090";
    const baseUrl = "http://27.96.135.10:8090";

    // 로그인 상태 설정
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

    const [cookies, setCookies, removeCookies] = useCookies(["sessionID"]);

    const [subManList, setSubManList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [subSelectList, setSubSelectList] = useState([]);
    const [selectedSub, setSelectedSub] = useState(1);
    const [selectedDate, setSelectedDate] = useState({
        year: 2023,
        month: 1,
        day: 1
    });
    const [selectedPrice, setSelectedPrice] = useState(0);

    const [isCalendar, setIsCalendar] = useState(false);

    const M = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const D = [];
    for(let i = 1; i <= 31; i++){
        D.push(i);
    }
    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkLogin = async () => {
    //         if(!isLoggedIn){
    //             alert("로그인이 필요한 서비스입니다.");
    //             navigate("/login");
    //         }
    //     };
    //     checkLogin();
    // }, []);

    useEffect(() => {
        const fetchData = async() => {
            if(!isLoggedIn){
                alert("로그인이 필요한 서비스입니다.");
                navigate("/login");
                return;
            }
            if(subManList.length === 0){
                // axios.defaults.withCredentials = true;
                axios.defaults.headers.common["Authorization"] = 
                    `Bearer ${window.localStorage.getItem("sessionID")}`;
                console.log(`Bearer ${window.localStorage.getItem("sessionID")}`);
                const response = await axios.get(baseUrl + "/submanages");
                console.log(response.data.result);
                setSubManList(response.data.result);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(totalPrice === 0 && subManList.length !== 0){
            subManList?.map((e) => setTotalPrice((prev) => prev + e.creditPrice));
        }
    }, [subManList]);

    const onModal = async (e) => {
        setIsModalOpen(true);
        const response = await axios.get(baseUrl + "/sub/names")
        console.log(response);
        setSubSelectList(response.data.result);
    };

    const onRegister = async (e) => {
        setIsModalOpen(false);
        try{
            const requestData = {
                "subId": parseInt(selectedSub),
                "creditDate": "2023-" + selectedDate.month + "-" + selectedDate.day,
                "creditPrice": parseInt(selectedPrice)
            }
            console.log(requestData);
            axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("sessionID")}`;
            const response = await axios.post(baseUrl + "/submanages", requestData, {"Content-type": "application/json"})
            alert("추가되었습니다");
            window.location.reload();
        } catch(error){
            console.log(error);
            alert("이미 등록된 구독 서비스입니다");
        }
    };

    const onDelete = async (e) => {
        console.log(e.target.id);
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("sessionID")}`;
        const response = await axios.delete(baseUrl + `/submanages/${parseInt(e.target.id)}`)
        console.log(response);
        window.location.reload();
        alert("삭제되었습니다");
    }

    const openCalendar = async (e) => {
        console.log(e);
        setIsCalendar(!isCalendar);
    }

    return(
        <div className='sublist_container'>
            <div className='sublist_wrapper'>
                <div className='sublist_title_wrapper'>
                    <div className='sublist_title'>나의 구독 관리</div>
                    <div className='sublist_addition_wrapper'>
                        <div id="menu">
                            <div>
                                <span>
                                <div className='sublist_howuse'>
                                    어떻게 사용하나요
                                    <img src={question} height='38px' width='38px'/>
                                </div>
                                </span>
                                <p class="arrow_box">구독하고 있는 서비스를 추가하기 버튼을 눌러서 추가하면<br/>매달 결제일 하루 전 알림문자를 보내드립니다!</p>
                            </div>
                        </div>
                        <div className='sublist_addBtn' onClick={onModal}>추가하기</div>
                    </div>
                </div>
                <div className='sublist_main_container'>
                    {subManList?.length !== 0 
                    ?
                        (subManList?.map((e) => (<SubManageCard data={e} onDelete={onDelete}/>)))
                    :
                        (<div className='sublist_nosub_wrapper'>
                            <img />
                            <div className='sublist_nosub'>등록한 구독 서비스가 존재하지 않습니다.</div>
                        </div>)
                    }                    
                </div>
                <div className='sublist_total_price_wrapper'>
                    <div className='sublist_total_price_txt'>
                        이번 달 총 금액 : <span className='sublist_total_price'>
                            {totalPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                        </span> 원
                    </div>
                </div>
            </div>
            {isModalOpen && 
                (<div className='modal_container'>
                    <div className='modal'>
                        <div className='modal_title'>구독 서비스 추가하기</div>
                        <table className='modal_table'>
                            <tr className='modal_tr'>
                                <tc className="modal_sub_title">구독 서비스</tc>
                                <td className='modal_sub_text'>
                                    <select className="modal_select" onChange={(e) => setSelectedSub(e.target.value)}>
                                        {subSelectList?.map((e) => <option className="modal_option" value={e.subId}>{e.name}</option>)}
                                    </select>
                                </td>
                            </tr>
                            <tr className='modal_tr'>
                                <tc className="modal_sub_title">다음 결제일</tc>
                                <td className='modal_sub_text'>
                                    <div className='modal_sub_text_div'>
                                        <div className='modal_year'>
                                            2023
                                        </div>
                                        <div className='modal_line'></div>
                                        <select className='modal_month' onChange={(e) => setSelectedDate((prev) => ({...prev, month: e.target.value}))}>
                                            {M.map((e) => (<option value={parseInt(e)}>{e}</option>))}
                                        </select>
                                        <div className='modal_line'></div>
                                        <select className='modal_day' onChange={(e) => setSelectedDate((prev) => ({...prev, day: e.target.value}))}>
                                            {D.map((e) => (<option value={parseInt(e)}>{e}</option>))}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr className='modal_tr'>
                                <tc className="modal_sub_title">결제 금액</tc>
                                <td className='modal_sub_text'>
                                    <div className='modal_sub_text_div'>
                                        <input className="modal_input" placeholder="선택" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}/>
                                        <div className='modal_sub_texts'>원</div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                        <div className='modal_btn_wrapper'>
                            <div className='modal_canBtn' onClick={(e) => setIsModalOpen(false)}>취소</div>
                            <div className='modal_chkBtn' onClick={onRegister}>확인</div>
                        </div>
                    </div>
                    
                </div>
            )}
        </div>
    );
};

export default SubList;