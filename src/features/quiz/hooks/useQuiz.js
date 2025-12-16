import { useState, useEffect } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useQuiz(){
  
  // [1] 필요 데이터 선언 
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  // [2] 필요 함수 선언 //없음 생략
  // [3] 성공/실패 콜백 함수 정의 //없음 생략

  // [4] REST API 요청 함수 정의 
  useEffect(()=>{
    async function fetchQuiz() {
      const rp = await api.get(`/quiz/getQuestion`, { public: true });
      setQuiz(rp.data);
      setLoading(false);
    }
    fetchQuiz();
  }, []);
  // [5] 반환
  return { quiz, loading };
}

//const useQuiz = []


  /*
  {
    id: 1,
    question: '주식에서 "배당"이란 무엇인가요?',
    choices: [
      '회사가 이익을 주주에게 나누어 주는 것',
      '주식을 빌려오는 것',
      '주식 계좌를 개설하는 것',
      '회사가 손실을 기록하는 것'
    ],
    answer: 0
  },
  {
    id: 2,
    question: '코스피(KOSPI)는 어떤 지수인가요?',
    choices: [
      '전 세계 주요 지수를 평균낸 것',
      '대한민국의 대표적인 종합 주가 지수',
      '코스닥 상장기업의 평균 주가',
      '미국 기술주의 지수'
    ],
    answer: 1
  },
  {
    id: 3,
    question: '주가가 오르면 기업의 어떤 요소가 높아진 것으로 볼 수 있을까요?',
    choices: [
      '시가총액',
      '부채비율',
      '직원 수',
      '세금'
    ],
    answer: 0
  },
  {
    id: 4,
    question: '"분산 투자"의 목적은 무엇인가요?',
    choices: [
      '하나의 종목에 집중해 수익을 극대화하기 위해',
      '투자 위험을 줄이기 위해 여러 자산에 나눠 투자하는 것',
      '주식을 더 자주 거래하기 위해',
      '단기 차익을 노리기 위해'
    ],
    answer: 1
  },
  {
    id: 5,
    question: '다음 중 "매도"의 의미는 무엇인가요?',
    choices: [
      '새로운 주식을 구매하는 것',
      '보유한 주식을 파는 것',
      '주식을 빌려오는 것',
      '주식 계좌를 만드는 것'
    ],
    answer: 1
  },
  {
    id: 6,
    question: 'ETF는 어떤 금융 상품인가요?',
    choices: [
      '개별 기업의 주식',
      '여러 자산을 묶어 만든 인덱스 추종 상품',
      '기업이 발행하는 채권',
      '비트코인과 같은 디지털 자산'
    ],
    answer: 1
  },
  {
    id: 7,
    question: '"손절"은 어떤 상황을 의미하나요?',
    choices: [
      '주가가 오를 때 이익을 실현하는 것',
      '주가가 더 떨어지는 것을 막기 위해 손실을 감수하고 파는 것',
      '배당금을 받는 것',
      '주식을 장기 보유하는 전략'
    ],
    answer: 1
  },
  {
    id: 8,
    question: '금리가 상승하면 일반적으로 어떤 일이 발생할 가능성이 높나요?',
    choices: [
      '주식 시장이 단기적으로 압박을 받을 수 있다',
      '모든 주가가 자동으로 상승한다',
      '기업의 실적이 무조건 좋아진다',
      '물가 상승률이 자동으로 떨어진다'
    ],
    answer: 0
  },
  {
    id: 9,
    question: '시가총액은 어떻게 계산하나요?',
    choices: [
      '기업 매출 × 영업이익',
      '주가 × 발행 주식 수',
      '배당금 × 주식 수',
      '순이익 × PER'
    ],
    answer: 1
  },
  {
    id: 10,
    question: 'PER(주가수익비율)은 무엇을 의미하나요?',
    choices: [
      '기업의 빚을 나타내는 지표',
      '주가가 1주당 순이익(EPS)의 몇 배인지 나타내는 지표',
      '1년 동안 받은 배당금 합계',
      '주가의 최고점과 최저점 차이'
    ],
    answer: 1
  }
]*/