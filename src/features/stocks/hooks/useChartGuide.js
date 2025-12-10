import introJs from "intro.js";
import "intro.js/introjs.css";

export function chartGuide(){
  introJs().setOptions({
    steps: [
      {
        element: "#candle-chart-area",
        intro: "여기는 주가 변동을 보는 차트예요. 기간에 따라 일/주/월을 선택해 볼 수 있어요.",
        position: "bottom"
      },
      {
        element: "#chipbar-ohlc",
        intro: "차트 위에  마우스를 올리면 시가, 고가, 저가, 종가를 보여줘요.",
      },
      {
        element: "#ma-chips",
        intro:"킬러 선들은 각각 단기, 중기, 장기 추세를 나타내요. 장기선 위에 있으면 상승 흐름일 가능성이 높아요."
      },
      {
        element: "#volume-chart-area",
        intro: "아래 차트는 얼마나 많은 거래가 있었는지 보여줘요. 거래량이 많으면 시장 관심이 높다는 뜻이에요.",
        position: "top"
      },
      {
        element: "#chart-area",
        intro: "마우스를 움직이면 해당 날짜의 모든 정보가 함께 바뀌어요, 비교하고 싶은 날짜를 쉽게 살펴볼 수 있어요."
      },
      {
        element: "#chart-area",
        intro: "마우스 휠로 차트를 확대/축소 할 수 있어요. 드래그하면 과거 데이터도 확인할 수 있어요"
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