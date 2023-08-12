import "./List.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import up from "./img/Polygon3.png";
import down from "./img/Polygon4.png";

function List(props) {
  let { id } = useParams();
  const [showInfoTab, setShowInfoTab] = useState(true);
  const [showSubscriptionTab, setShowSubscriptionTab] = useState(false);
  const [showCancellationTab, setShowCancellationTab] = useState(false);
  return (
    <div className="container">
      <div className="main">
        <div className="sub_category">
          <span>카테고리 {">"} 음식 </span>
        </div>
        <div className="sub_container">
          <div className="sub_img">
            <img src="https://mblogthumb-phinf.pstatic.net/MjAyMDAxMTVfNTkg/MDAxNTc5MDUxMTM2MzYy.1WTLuTdfI6-9BOmoInzfzwZKJCT-ZA-TS5fmK73Ncgcg.SE37huyBMMTHha6z3bErwlxCV5nHAaJFAHQ87QNyrV8g.JPEG.yellowouk2/1579051135206.jpg?type=w800"></img>
          </div>
          <div className="sub_info">
            <div className="sub_title">
              <span>다다일상(오셜록)</span>
            </div>
            <div className="sub_summary">
              <span>다채롭고 다양한 일상을 위한</span>
            </div>
            <div className="sub_summary">
              <span>오셜록만의 특별한 차 구독 서비스</span>
            </div>
          </div>
        </div>

        <div className="sub_detail">
          <nav className="sub_navbar">
            <ul>
              <li className="sub_navbarMenu">
                <button
                  className="tab_button"
                  onClick={() => {
                    setShowInfoTab(true);
                    setShowSubscriptionTab(false);
                    setShowCancellationTab(false);
                  }}
                >
                  정보
                </button>
              </li>
              <li className="sub_navbarMenu">
                <button
                  className="tab_button"
                  onClick={() => {
                    setShowInfoTab(false);
                    setShowSubscriptionTab(true);
                    setShowCancellationTab(false);
                  }}
                >
                  구독 방법
                </button>
              </li>
              <li className="sub_navbarMenu">
                <button
                  className="tab_button"
                  onClick={() => {
                    setShowInfoTab(false);
                    setShowSubscriptionTab(false);
                    setShowCancellationTab(true);
                  }}
                >
                  해지 방법
                </button>
              </li>
            </ul>
          </nav>
          <div className="sub_detail_container">
            {showInfoTab && (
              <div className="tab">
                <div className="tab_sub">
                  ‘예스어스’는 자연 그대로 자란 “못난이 농산물”을 “저렴하게”
                  받아볼 수 있는 농산물 정기 배송 서비스입니다
                </div>
                <div className="tab_sub">
                  버려질 위기에 처한 친환경 농산물을 예스어스를 통해 소비할 수
                  있습니다 예스어스에 들어가는 농산물들은 자연 그대로 자랐기에
                  크기와 생김새가 다양합니다
                </div>
                <div className="tab_sub">
                  화학 비료, 성장 촉진제, 왁스, 호르몬제를 사용하지 않는 친환경
                  농산물로 안심하고 드실 수 있습니다
                </div>
              </div>
            )}
            {showSubscriptionTab && (
              <div className="tab">구독 방법 탭이에용</div>
            )}
            {showCancellationTab && (
              <div className="tab">해지 방법 탭이에용</div>
            )}
          </div>
        </div>
      </div>
      <div className="side">
        <div className="side_bar">
          <div className="price_title">
            <span>가격 정보</span>
          </div>
          <div className="side_box">
            <div className="price_box">
              <div className="price_tag">
                <img src={up} className="arrow" />
                <span>최고가 : </span>
              </div>
              <div className="average">평균 : </div>
              <div className="price_tag">
                <img src={down} className="arrow" />
                <span>최저가 : </span>
              </div>
            </div>
          </div>
          <button className="link_button">구매 바로가기</button>
        </div>
      </div>
    </div>
  );
}

export default List;
