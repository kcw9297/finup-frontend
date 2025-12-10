import introJs from "intro.js";
import "intro.js/introjs.css";

export function chartGuide(){
  introJs().setOptions({
    steps: [
      {
        element: "#candle-chart-area",
        intro: "이곳이 기본 캔들 차트입니다. 시가·고가·저가·종가 구조를 나타냅니다.",
        position: "bottom"
      },
      {
        element: "#candle-ohlc-box",
        intro: "여기에 마우스 위치에 따른 OHLC 정보가 표시됩니다.",
        position: "right"
      },
      {
        element: "#volume-chart-area",
        intro: "이곳은 거래량 영역입니다. 막대의 높이로 관심도를 파악할 수 있어요.",
        position: "top"
      },
      {
        intro: "이제 차트를 자유롭게 탐색해보세요!"
      }
    ],
    showProgress: true,
    exitOnOverlayClick: false,
    nextLabel: "다음",
    prevLabel: "이전",
    doneLabel: "완료"
  }).start()
}