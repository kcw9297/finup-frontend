import introJs from "intro.js";

export function chartGuide(){
  introJs().setOptions({
    steps: [
      {
        element: "#candle-chart-area",
        intro: `<strong>📈 주가 차트</strong><br/>
                기간에 따라 일봉·주봉·월봉을 선택해
                가격 흐름을 비교할 수 있어요.
                `,
        position: "bottom"
      },
      {
        element: "#chipbar-ohlc",
        intro: `
          <strong>📌 시가 · 고가 · 저가 · 종가</strong><br/>
          차트 위에 <b>마우스를 올리면</b><br/>
          해당 시점의 가격 정보가 표시돼요.
        `
      },
      {
        element: "#ma-chips",
        intro: `
          <strong>📉 이동평균선</strong><br/>
          컬러 선들은 <b>단기 · 중기 · 장기 추세</b>를 의미해요.<br/>
          장기선 위에 있으면 <b>상승 흐름</b>일 가능성이 높아요.
        `
      },
      {
        element: "#volume-chart-area",
        intro: `
          <strong>📊 거래량 차트</strong><br/>
          아래 차트는 <b>얼마나 많은 거래</b>가 있었는지 보여줘요.<br/>
          거래량이 많을수록 시장의 관심이 크다는 뜻이에요.
        `,
        position: "top"
      },
      {
        element: "#chart-area",
        intro: `
          <strong>🔄 날짜별 정보 비교</strong><br/>
          마우스를 움직이면 해당 날짜의<br/>
          <b>가격 · 이동평균 · 거래량</b>이 함께 바뀌어요.
        `
      },
      {
        element: "#chart-area",
        intro: `
          <strong>🔍 차트 확대 · 이동</strong><br/>
          <b>마우스 휠</b>로 확대·축소할 수 있고,<br/>
          드래그하면 과거 데이터도 확인할 수 있어요.
        `
      },
      {
        intro: `
          <strong>✅ 차트 탐색 준비 완료!</strong><br/>
          이제 차트를 자유롭게 움직이며<br/>
          <b>가격 흐름과 거래량</b>을 직접 살펴보세요.
        `
      }
    ],
    showProgress: false,
    highlightClass: "introjs-no-strong-highlight",
    overlayOpacity: 0.35,
    exitOnOverlayClick: false,
    nextLabel: "다음",
    prevLabel: "이전",
    doneLabel: "차트 보기"
  }).start()
}