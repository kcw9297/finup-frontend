import { useState, useEffect, useCallback, useRef } from "react";
import { api } from "../../../base/utils/fetchUtils";

// 환율 데이터 생성
function transformExchangeRate(item) {
    return {
      indexName: item.indexName,
      todayValue: item.todayValue,
      todayFluctuationRate: item.todayFluctuationRate,
      updatedAt: item.updatedAt,
      isUp: item.todayFluctuationRate >= 0,
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
      const res = await api.get("/indicators/index/financial", { public: true });

      if (lastRequestRef.current !== requestId) return;
      const payload = res.data ?? [];
      const mapped = payload.map(transformExchangeRate);
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
function transformMarketIndex(item) {
  return {
    indexName: item.indexName,
    todayValue: item.todayValue,
    todayFluctuationRate: item.todayFluctuationRate,
    updatedAt: item.updatedAt,
    isUp: item.todayFluctuationRate >= 0,
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
      const res = await api.get("/indicators/index/market",{ public: true });
      if (lastRequestRef.current !== requestId) return;

      const payload = res.data ?? [];
      const mapped = payload.map(transformMarketIndex);
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