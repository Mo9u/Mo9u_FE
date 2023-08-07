import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from './img/logo.png';

function Nav() {
  return (
    <div className='navbox'>
        <div className='logo'><img src={logo} width = '264px'/></div>
      <nav className='navbar'>
        <ul>
          <li className='navbarMenu'>
            <Link to={'/'}>구독 유형 검사</Link>
          </li>
          <li className='navbarMenu'>
            <Link to={'/list'}>구독 서비스 구경하기</Link>
          </li>
          <li className='navbarMenu'>
            <Link to={'/intro'}>서비스 소개</Link>
          </li>
        </ul>
      </nav>
    </div> 
  );
}

export default Nav;
