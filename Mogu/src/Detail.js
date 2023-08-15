import "./Detail.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import up from "./img/icon/Polygon3.png";
import down from "./img/icon/Polygon4.png";
import axios from "axios";

function Detail(props) {
  let { id } = useParams();

  const baseUrl = "http://27.96.135.10:8090";

  const [result, setResult] = useState({});

  useEffect(() => {
    async function getResult() {
      await axios
        .get(baseUrl + `/sub/${id}`)
        .then((response) => {
          console.log(response.data.result);
          setResult(response.data.result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getResult();
  }, []);

  const [showInfoTab, setShowInfoTab] = useState(true);
  const [showSubscriptionTab, setShowSubscriptionTab] = useState(false);
  const [showCancellationTab, setShowCancellationTab] = useState(false);

  let categoryText = "";

  switch (result.category) {
    case "food":
      categoryText = "음식";
      break;
    case "health":
      categoryText = "건강";
      break;
    case "culture":
      categoryText = "생활 / 편의";
      break;
    default:
      categoryText = "기타";
  }
  return (
    <div className="container">
      <div className="main">
        <div className="sub_category">
          <span>
            카테고리 {">"} {categoryText}
          </span>
        </div>
        <div className="sub_container">
          <div className="sub_img">
            <img src={result.mainImage} alt="mainImage"></img>
          </div>
          <div className="sub_info">
            <div className="sub_title">
              <span>{result.name}</span>
            </div>
            <div className="sub_summary">
              <span>다채롭고 다양한 일상을 위한</span>
            </div>
            <div className="sub_summary">
              <span>오설록만의 특별한 차 구독 서비스</span>
            </div>
          </div>
        </div>

        <div className="sub_detail">
          <nav className="sub_navbar">
            <ul>
              <li className="sub_navbarMenu">
                <button
                  className={`tab_button ${showInfoTab ? "active" : ""}`}
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
                  className={`tab_button ${
                    showSubscriptionTab ? "active" : ""
                  }`}
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
                  className={`tab_button ${
                    showCancellationTab ? "active" : ""
                  }`}
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
                {result.mainContent?.map((i, idx) => (
                  <div className="tab_sub">
                    {idx + 1}. {i}
                  </div>
                ))}
              </div>
            )}
            {showSubscriptionTab && (
              <div className="tab">
                {result.howSubExplain.map((explain, idx) => (
                  <div className="tab_sub" key={idx}>
                    <div className="text_box">
                      {idx + 1}. {explain}
                    </div>
                    {result.howSubImg[idx] && ( // Check if image is not null
                      <div className="img_box">
                        <img
                          src={result.howSubImg[idx]}
                          alt={`How to Sub ${idx}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {showCancellationTab && (
              <div className="tab">
                {result.howExitExplain.map((exit, idx) => (
                  <div className="tab_sub" key={idx}>
                    <div className="text_box">
                      {idx + 1}. {exit}
                    </div>

                    {result.howExitImg[idx] && ( // Check if image is not null
                      <div className="img_box">
                        <img
                          src={result.howExitImg[idx]}
                          alt={`How to Exit ${idx}`}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
                <span>
                  최고가{" "}
                  {result.maxPrice
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원/월
                </span>
              </div>
              <div className="average">
                평균{" "}
                {result.avgPrice
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                원/월
              </div>
              <div className="price_tag">
                <img src={down} className="arrow" />
                <span>
                  최저가{" "}
                  {result.minPrice
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  원/월
                </span>
              </div>
            </div>
          </div>
          <button className="link_button">
            <a href={result.link} target="_blank" rel="noreferrer noopener">
              구매 바로가기
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
