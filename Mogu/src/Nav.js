import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import logo from "./img/logo.png";

function Nav() {
  const location = useLocation();

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
      </nav>
    </div>
  );
}

export default Nav;
