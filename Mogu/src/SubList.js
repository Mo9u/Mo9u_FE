import './SubList.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import SubManageCard from './components/SubManageCard';
import axios from 'axios';

import notification from './img/icon/notifications.png';
import calendar from './img/calendar.png';
import question from './img/icon/question.png';
import pilly from './img/pilly.png';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import { getMonth, getYear } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

function SubList () {
    const baseUrl = "http://localhost:8090";

    const [cookies, setCookies, removeCookies] = useCookies(["sessionID"]);

    const [subManList, setSubManList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [subSelectList, setSubSelectList] = useState([]);
    const [selectedSub, setSelectedSub] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedPrice, setSelectedPrice] = useState(0);

    const [isCalendar, setIsCalendar] = useState(false);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const fetchData = async() => {
            if(subManList.length === 0){
                axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.sessionID}`;
                console.log(`Bearer ${cookies.sessionID}`);
                const response = await axios.get(baseUrl + "/submanages");
                console.log(response);
                setSubManList(response.data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if(totalPrice === 0){
            subManList.map((e) => setTotalPrice((prev) => prev + e.creditPrice));
        }
    }, [subManList]);

    const onModal = async (e) => {
        setIsModalOpen(true);
        const response = await axios.get(baseUrl + "/sub/name")
        console.log(response);
        setSubSelectList(response.data);
    };

    const onRegister = async (e) => {
        setIsModalOpen(false);
        const requestData = {
            "subId": selectedSub,
            "creditDate": selectedDate,
            "creditPrice": selectedPrice
        }
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.sessionID}`;
        const response = await axios.post(baseUrl + "/submanages", requestData, {"Content-type": "application/json"})
        console.log(response);
    };

    const onDelete = async (e) => {
        console.log(e.target.id);
        axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.sessionID}`;
        const response = await axios.delete(baseUrl + `/submanages/${parseInt(e.target.id)}`)
        console.log(response);
    }

    const openCalendar = async (e) => {
        console.log(e);
        setIsCalendar(!isCalendar);
    }

    const YEARS = Array.from({ length: getYear(new Date()) + 1 - 2000 }, (_, i) => getYear(new Date()) - i);
    const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ];

    return(
        <div className='sublist_container'>
            <div className='sublist_wrapper'>
                <div className='sublist_title_wrapper'>
                    <div className='sublist_title'>나의 구독 관리</div>
                    <div className='sublist_addition_wrapper'>

                        <div className='sublist_howuse'>
                            어떻게 사용하나요
                            <img src={question} height='38px' width='38px'/>
                        </div>
                        <div className='sublist_addBtn' onClick={onModal}>추가하기</div>
                    </div>
                </div>
                <div className='sublist_main_container'>
                    {subManList?.map((e) => (<SubManageCard data={e} onDelete={onDelete}/>))}                    
                </div>
                <div className='sublist_total_price_wrapper'>
                    <div className='sublist_total_price_txt'>이번 달 총 금액 : <span className='sublist_total_price'>{totalPrice}</span> 원</div>
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
                                        {subSelectList.map((e) => <option className="modal_option" value={e.subId}>{e.name}</option>)}
                                    </select>
                                </td>
                            </tr>
                            <tr className='modal_tr'>
                                <tc className="modal_sub_title">결제일</tc>
                                <td className='modal_sub_text'>
                                    <div>
                                        <input value={selectedDate} placeholder="2023-01-01" onChange={(e) => setSelectedDate(e.target.value)} className="modal_date_input"/>
                                        <img style={{'margin-left': '50px'}} src={calendar} onClick={openCalendar}/>
                                    </div>
                                </td>
                            </tr>
                            <tr className='modal_tr'>
                                <tc className="modal_sub_title">결제 금액</tc>
                                <td className='modal_sub_text'><input className="modal_input" placeholder="선택" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)}/></td>
                            </tr>
                        </table>
                        <div className='modal_btn_wrapper'>
                            <div className='modal_canBtn' onClick={(e) => setIsModalOpen(false)}>취소</div>
                            <div className='modal_chkBtn' onClick={onRegister}>확인</div>
                        </div>
                    </div>
                    {isCalendar && (
                        <div className='datePicker_container'>
                        <div className='datePicker_wrapper'>
                        <DatePicker
                            dateFormat='yyyy.MM.dd'
                            formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
                            showYearDropdown
                            scrollableYearDropdown
                            shouldCloseOnSelect
                            yearDropdownItemNumber={100}
                            minDate={new Date('2000-01-01')}
                            maxDate={new Date()}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className='datePicker'                          
                        />
                        </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SubList;