import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import logo from "./img/logo.png";

function Nav() {
  return (
    <div className="navbox">
      <div className="logo">
        <Link to={"/"}>
          <img src={logo} width="264px" />
        </Link>
      </div>
      <nav className="navbar">
        <ul>
          <li className="navbarMenu">
            <Link to={"/"}>구독 유형 검사</Link>
          </li>
          <li className="navbarMenu">
            <Link to={"/list"}>구독 서비스 구경하기</Link>
          </li>
          <li className="navbarMenu">
            <Link to={"/sublist"}>나의 구독 관리</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
