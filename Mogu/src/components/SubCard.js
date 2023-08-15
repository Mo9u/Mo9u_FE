import './SubCard.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SubCard (props) {
    const navigate = useNavigate();

    return(
        <div className='product'>
          <div className='image'><img onClick={(e) => navigate(`/detail/${props.data.id}`)} src={props.data.mainImage} width='300px' alt={props.data.name}/></div>
          <div className='text'>
              <div className='name'>{props.data.name}</div>
              <p>{props.data.simpleContent}</p>
          </div>
        </div>
    );
}

export default SubCard;