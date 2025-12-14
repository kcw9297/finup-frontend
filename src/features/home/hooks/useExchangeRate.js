import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../base/utils/fetchUtils";

// 환율 데이터 생성
export function makeData(title, today, yesterday) {
  if (!yesterday) {
    return {
      title,
      today,
      yesterday,
      diff: 0,
      rate: 0,
      isUp: true,
    };
  }

  const diff = today - yesterday;
  return {
    title,
    today,
    yesterday,
    diff: +diff.toFixed(2),
    rate: +((diff / yesterday) * 100).toFixed(2),
    isUp: diff >= 0,
  };
}

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

      // 백엔드 응답 구조에 맞게 변환
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

// 지수 전용 데이터 생성
export function makeIndexData(title, today, rate) {
  const diff = +((today * rate) / 100).toFixed(2);

  return {
    title,
    today,
    diff,
    rate: +rate.toFixed(2),
    isUp: rate >= 0,
  };
}

export function useMarketIndex() {
  const [indexes, setIndexes] = useState([]);
  const [loading, setLoading] = useState(false);
  const lastRequestRef = useRef(0);

  const fetchIndexes = useCallback(async () => {
    const requestId = Date.now();
    lastRequestRef.current = requestId;

    setLoading(true);
    try {
      const res = await api.get(
        "/home/market-index/latest",
        { public: true }
      );

      if (lastRequestRef.current !== requestId) return;

      const payload = res.data ?? [];

      const mapped = payload.map((item) =>
        makeIndexData(
          item.idxNm,
          Number(item.today),
          Number(item.rate)
        )
      );

      setIndexes(mapped);
    } catch (err) {
      console.error("지수 불러오기 오류:", err);
    } finally {
      if (lastRequestRef.current === requestId) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchIndexes();
  }, [fetchIndexes]);

  return {
    indexes,
    loading,
    refreshIndexes: fetchIndexes,
  };
}