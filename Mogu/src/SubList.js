import './SubList.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import SubManageCard from './components/SubManageCard';
import axios from 'axios';

import notification from './img/icon/notifications.png';
import question from './img/icon/question.png';
import pilly from './img/pilly.png';

function SubList () {
    const baseUrl = "http://localhost:8090";
    const [subManList, setSubManList] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async() => {
            if(subManList.length === 0){
                const response = await axios.get(baseUrl + "/sub/manage/list");
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
                        <div className='sublist_addBtn'>추가하기</div>
                    </div>
                </div>
                <div className='sublist_main_container'>
                    {subManList?.map((e) => (<SubManageCard data={e}/>))}                    
                </div>
                <div className='sublist_total_price_wrapper'>
                    <div className='sublist_total_price_txt'>이번 달 총 금액 : <span className='sublist_total_price'>{totalPrice}</span> 원</div>
                </div>
            </div>
        </div>
    );
};

export default SubList;