import './SubManageCard.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import pilly from '../img/pilly.png';

function SubManageCard (props){
    const navigate = useNavigate();
    return(
        <div className='sublist_main_content'>
            <div className='sublist_content_wrapper'>
                <div className='sublist_main_img' onClick={(e) => navigate(`/detail/${props.data.subId}`)}>
                    <img src={props.data.subImage} height="100px" width="100px"/>
                </div>
                <div className='sublist_sub_name'  onClick={(e) => navigate(`/detail/${props.data.subId}`)}>{props.data.subName}</div>
                <div className='sublist_sub_date'>매월 {props.data.creditDate[2]}일</div>
                <div className='sublist_sub_price'>{props.data.creditPrice}원</div>
            </div>
            <div className='sublist_delBtn' id={props.data.id} onClick={props.onDelete}>지우기</div>
        </div>
    );
}

export default SubManageCard;