// 환율, 코스피 등 공통 데이터 생성 함수
export function makeData(title, today, yesterday) {
  const diff = today - yesterday;
  return {
    title,
    today,
    yesterday,
    diff: +diff.toFixed(2),
    rate: +( (diff / yesterday) * 100 ).toFixed(2),
    isUp: diff >= 0,
  };
}

// 환율 + 지수 데이터 훅
export function useExchangeRate() {

  const usd = makeData("USD/KRW", 1344.50, 1338.10);
  const jpy = makeData("JPY/KRW", 884.20, 879.50);
  const kospi = makeData("KOSPI", 2430.35, 2410.10);
  const kosdaq = makeData("KOSDAQ", 825.13, 818.40);

  const quotation = [usd, jpy, kospi, kosdaq];

  return { quotation };
}