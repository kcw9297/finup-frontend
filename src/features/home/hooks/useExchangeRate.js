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

const res = await api.get(
  "/home/exchange-rates/latest",
  { public: true }
);

import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useExchangeRate() {
  const [quotation, setQuotation] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastRequestRef = useRef(0);

  const fetchExchangeRates = useCallback(async () => {
    const requestId = Date.now();
    lastRequestRef.current = requestId;

    setLoading(true);
    try {
      const res = await api.get(
        "/home/exchange-rates/latest",
        { public: true }
      );

      if (lastRequestRef.current !== requestId) return;

      const payload = res.data ?? [];

      // ✅ 백엔드 응답 구조에 맞게 변환
      const mapped = payload.map((item) => {
        const today = Number(item.today);
        const yesterday = Number(item.yesterday);

        return makeData(
          item.curUnit === "JPY(100)" ? "JPY/KRW" : `${item.curUnit}/KRW`,
          today,
          yesterday
        );
      });

      setQuotation(mapped);
    } catch (err) {
      console.error("환율 불러오기 오류:", err);
    } finally {
      if (lastRequestRef.current === requestId) {
        setLoading(false);
      }
    }
  }, []);

  // 최초 1회 호출
  useEffect(() => {
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  return {
    quotation,
    loading,
    refreshExchangeRates: fetchExchangeRates,
  };
}