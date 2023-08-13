import "./Test.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Test() {
  const setVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setVh();

    function onResize() {
      setVh();
    }

    window.addEventListener("resize", onResize);
  }, []);

  const [page, setPage] = useState(0);

  const questionList = [
    //IE질문
    {
      q: ["휴가로 가고 싶은 휴양지는?"],
      a: [
        { type: "I", text: "조용하고 한적한 곳" },
        { type: "E", text: "사람이 많이 오는 유명한 관광지" },
      ],
    },
    {
      q: ["나는 보통 에너지를"],
      a: [
        { type: "I", text: "개인적인 활동으로 얻는다." },
        { type: "E", text: "사람들과 함께 시간을 보낼 때 얻는다" },
      ],
    },
    {
      q: ["새로운 사람들과 만날 때"],
      a: [
        { type: "I", text: "말을 먼저 걸어주길 기다린다" },
        { type: "E", text: "먼저 대화를 시작한다" },
      ],
    },
    //TF질문
    {
      q: ["가족들에게 밥을 해줬을 때 더 듣고 싶은 말은?"],
      a: [
        { type: "T", text: "맛있다. 다음에 또 해줘~" },
        { type: "F", text: "맛있는 밥해줘서 고마워!" },
      ],
    },
    {
      q: ["가족이 체했다고 했을 때 나는?"],
      a: [
        { type: "T", text: "뭐 먹고 체했어?" },
        { type: "F", text: "괜찮아? 소화제 사올까?" },
      ],
    },
    {
      q: ["가족이 슬퍼서 밥을 안 먹었다고 하면 나는?"],
      a: [
        { type: "T", text: "일단 밥 먼저 먹자!" },
        { type: "F", text: "무슨 일 있어?" },
      ],
    },
    //PJ질문
    {
      q: ["일을 시작할 때 나는"],
      a: [
        { type: "P", text: "자세한 계획 없이 바로 시작한다" },
        { type: "J", text: "철저한 계획을 세우고 시작한다" },
      ],
    },
    {
      q: ["일상 생활에서 갑작스러운 계획 변경이 있을 때,"],
      a: [
        { type: "P", text: "즉흥적으로 변화에 적응한다" },
        {
          type: "J",
          text: "미리 세운 일정과 계획을 따라가려고 한다",
        },
      ],
    },
    {
      q: ["가족들과 외식을 할 때 무엇을 먹을지 나는"],
      a: [
        { type: "P", text: "일단 만나고 생각한다" },
        { type: "J", text: "미리 정한다" },
      ],
    },
  ];

  const [mbtiList, setMbtiList] = useState([
    { name: "I", count: 0 },
    { name: "E", count: 0 },
    { name: "T", count: 0 },
    { name: "F", count: 0 },
    { name: "P", count: 0 },
    { name: "J", count: 0 },
  ]);

  const handleCkAnswer = (type, idx) => {
    let ls = mbtiList;
    for (let i = 0; i < ls.length; i++) {
      if (ls[i].name === type) {
        ls[i].count = ls[i].count + 1;
      }
    }
    setMbtiList(ls);
    setPage(page + 1);

    if (idx + 1 === questionList.length) {
      setMbti();
    }
  };
  const progress = ((page) / questionList.length) * 100;

  const [mbtiContents, setMbtiContents] = useState([]);

  function setMbti() {
    let mc = [
      { mbti: "ITJ" },
      { mbti: "ETJ" },
      { mbti: "ITP" },
      { mbti: "ETP" },
      { mbti: "IFJ" },
      { mbti: "EFJ" },
      { mbti: "IFP" },
      { mbti: "EFP" },
    ];
    let IorE =
      mbtiList.find(function (data) {
        return data.name === "I";
      }).count >
      mbtiList.find(function (data) {
        return data.name === "E";
      }).count
        ? "I"
        : "E";

    let TorF =
      mbtiList.find(function (data) {
        return data.name === "T";
      }).count >
      mbtiList.find(function (data) {
        return data.name === "F";
      }).count
        ? "T"
        : "F";

    let PorJ =
      mbtiList.find(function (data) {
        return data.name === "P";
      }).count >
      mbtiList.find(function (data) {
        return data.name === "J";
      }).count
        ? "P"
        : "J";

    let mbti = IorE + TorF + PorJ;

    setMbtiContents(mc.filter((val) => val.mbti === mbti)[0]);
  }

 
  //백 연결
  const baseUrl = "";

  const [resultImg, setResultImg] = useState();
  const [resultName, setResultName] = useState("필리");
  const [resultContent, setResultContent] = useState(
    "자신감과 건강한 마음을 지닌 당신에게\n몸 건강도 챙길 수 있는 “필리”를 추천합니다."
  );

  async function getResult() {
    await axios
      .get(baseUrl, { "content-type": "application/json" })
      .then((response) => {
        console.log(response.data);
        setResultImg(response.data.userName);
        setResultName(response.data.password);
        setResultContent(response.data.password);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="mbtiLayout">
      {page === 0 ? (
        //시작화면
        <div className="startPageLayout">
          <div className="banner">
            <div className="bannerText">다양한 구독 서비스로 편리해진 세상</div>
            <div className="bannerText2">누구나 쉽게 사용할 수 있어요!</div>
          </div>
          <div className="testLayout">
            <div className="testTitle">나와 꼭 맞는 구독 서비스 찾기</div>
            <div onClick={() => setPage(1)} className="startButton">
              구독 유형 검사하기
            </div>
          </div>
          <div className="countLayout">
            <div className="countUnderline"></div>
            <div className="countTitle">참여자 수</div>
            <div className="countNum">99,999</div>
          </div>
        </div>
      ) : //테스트 페이지
      page <= questionList.length ? (
        <div className="questionLayout">
          {questionList.map((val, idx) => (
            <div
              className="questionList"
              style={{ display: page === idx + 1 ? "flex" : "none" }}
            >
              <div className="chatListLayout">
                {val.q.map((qval, qidx) => (
                  <div key={qidx} className="chatBox">
                    <div>{qval}</div>
                  </div>
                ))}
              </div>
              <div className="answerItemLayout">
                {val.a.map((aval, aidx) => (
                  <div
                    key={aidx}
                    className="answerBox"
                    onClick={() => handleCkAnswer(aval.type, idx)}
                  >
                    {aval.text}
                  </div>
                ))}
              </div>
              <div className="progress">
                <div className="progressBar">
                  <div className="progressFill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="progressNum">{`${page} / ${questionList.length}`}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        //결과
        //mbtiContents.mbti -> itj
        <div className="resultLayout">
          <div className="resultTitle">추천 구독 서비스</div>
          <div className="resultImg"></div>
          <div className="resultName">{resultName}</div>
          <div className="resultContent">{resultContent}</div>
          <div className="detailButton">
            <Link to={"/detail"} className="detailLink">상세 페이지 바로가기</Link>
          </div>
          <div onClick={() => setPage(0)} className="retryButton">
            다시하기
          </div>
        </div>
      )}
    </div>
  );
}

export default Test;
