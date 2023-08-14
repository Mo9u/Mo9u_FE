import './SubList.css';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';

import notification from './img/icon/notifications.png';
import question from './img/icon/question.png';
import pilly from './img/pilly.png';

function SubList () {
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
                    <div className='sublist_main_content'>
                        <div className='sublist_content_wrapper'>
                            <div className='sublist_main_img'>
                                <img src={pilly} height="100px" width="100px"/>
                            </div>
                            <div className='sublist_sub_name'>필리</div>
                            <div className='sublist_sub_date'>매월 13일</div>
                            <div className='sublist_sub_price'>20,000원</div>
                        </div>
                        <div className='sublist_delBtn'>지우기</div>
                    </div>
                    <div className='sublist_line'></div>

                    <div className='sublist_main_content'>
                        <div className='sublist_content_wrapper'>
                            <div className='sublist_main_img'>
                                <img src={pilly} height="100px" width="100px"/>
                            </div>
                            <div className='sublist_sub_name'>필리</div>
                            <div className='sublist_sub_date'>매월 13일</div>
                            <div className='sublist_sub_price'>20,000원</div>
                        </div>
                        <div className='sublist_delBtn'>지우기</div>
                    </div>
                    <div className='sublist_line'></div>

                    <div className='sublist_main_content'>
                        <div className='sublist_content_wrapper'>
                            <div className='sublist_main_img'>
                                <img src={pilly} height="100px" width="100px"/>
                            </div>
                            <div className='sublist_sub_name'>필리</div>
                            <div className='sublist_sub_date'>매월 13일</div>
                            <div className='sublist_sub_price'>20,000원</div>
                        </div>
                        <div className='sublist_delBtn'>지우기</div>
                    </div>
                    <div className='sublist_line'></div>

                    <div className='sublist_main_content'>
                        <div className='sublist_content_wrapper'>
                            <div className='sublist_main_img'>
                                <img src={pilly} height="100px" width="100px"/>
                            </div>
                            <div className='sublist_sub_name'>필리</div>
                            <div className='sublist_sub_date'>매월 13일</div>
                            <div className='sublist_sub_price'>20,000원</div>
                        </div>
                        <div className='sublist_delBtn'>지우기</div>
                    </div>
                </div>
                <div className='sublist_total_price_wrapper'>
                    <div className='sublist_total_price_txt'>이번 달 총 금액 : <span className='sublist_total_price'>99,999</span> 원</div>
                </div>
            </div>
        </div>
    );
};

export default SubList;