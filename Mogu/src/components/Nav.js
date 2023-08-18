import React from "react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./Nav.css";
import logo from "../img/logo.png";

import { LoginState } from "../states/LoginState";

function Nav() {
  const location = useLocation();
  const navigate = useNavigate();

  // 로그인 상태 설정
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);

  const logout = async (e) => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  }
  return (
    <div className="navbox">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} width="264px" alt="Logo" />
        </Link>
      </div>
      <nav className="navbar">
        <ul>
          <li
            className={`navbarMenu ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <Link to={"/"}>구독 유형 검사</Link>
          </li>
          <li
            className={`navbarMenu ${
              location.pathname === "/list" ? "active" : ""
            }`}
          >
            <Link to={"/list"}>구독 서비스 구경하기</Link>
          </li>
          <li
            className={`navbarMenu ${
              location.pathname === "/sublist" ? "active" : ""
            }`}
          >
            <Link to={"/sublist"}>나의 구독 관리</Link>
          </li>
        </ul>

        {isLoggedIn 
        ? 
        (
          <div className="user_container">
            <div className="user_join_btn" onClick={logout}>로그아웃</div>
          </div>
        )
        :
        (<div className="user_container">
          <Link to={"/login"}><div className="user_login_btn">로그인</div></Link>
          <Link to={"/join"}><div className="user_join_btn">회원가입</div></Link>
        </div>)
        }
      </nav>
    </div>
  );
}

export default Nav;
