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
      q: ["내일 먹을 버섯 전골에 들어갈", "채소를 사야할 때 나는?"],
      a: [
        { type: "I", text: "‘나가기 귀찮아...’ 인터넷으로 주문한다" },
        { type: "E", text: "오랜만에 바람도 쐴 겸 마트에 간다" },
      ],
    },
    {
      q: ["너 이번주에 엄청 바빴다며", "주말에 뭐해?"],
      a: [
        { type: "I", text: "너무 힘들었어 ㅜㅜㅜ 집에서 쉬어야지" },
        { type: "E", text: "바빠서 못놀았어 ㅜㅜ 나가 놀아야지" },
      ],
    },
    {
      q: ["자주 가는 카페 사장님이 아는척을 했다", ""],
      a: [
        { type: "I", text: "(이제 그만 와야지)" },
        { type: "E", text: "(더 자주 와야지)" },
      ],
    },
    //TF질문
    {
      q: ["나 요즘 너무 우울해서", "여행 가려고"],
      a: [
        { type: "T", text: "어디로 여행가게?" },
        { type: "F", text: "무슨 일 있어?" },
      ],
    },
    {
      q: ["슬픔을 나누면 어떻게 될까?"],
      a: [
        { type: "T", text: "슬과 픔" },
        { type: "F", text: "슬픔이 반이 되지" },
      ],
    },
    {
      q: ["나 시험에서 떨어졌어ㅜㅜ"],
      a: [
        { type: "T", text: "무슨 시험 봤는데? 몇점?" },
        { type: "F", text: "많이 속상하겠다... ㅠㅠ" },
      ],
    },
    //PJ질문
    {
      q: ["안 읽은 메세지 갯수 몇개야?"],
      a: [
        { type: "P", text: "10개 이상" },
        { type: "J", text: "0개 ~ 한자리수" },
      ],
    },
    {
      q: ["여행 일정 짰어?"],
      a: [
        { type: "P", text: "ㅇㅇ 국밥 먹고 바다가서 놀다가 카페가자" },
        {
          type: "J",
          text: "7시 30분 만남, 8시 할매국밥, 9시 유리 박물관, 11시 유리해수욕장, 12시 카페...",
        },
      ],
    },
    {
      q: ["2주 뒤에 시험이다."],
      a: [
        { type: "P", text: "시험이 2주나 남았네!" },
        { type: "J", text: "시험이 2주밖에 안남았네." },
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
                <div>{`${page} / ${questionList.length}`}</div>
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
            <Link to={"/detail"}>상세 페이지 바로가기</Link>
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
