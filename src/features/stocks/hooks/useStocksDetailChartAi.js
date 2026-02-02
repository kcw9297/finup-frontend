import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksDetailChartAi(code, candleType) {

  const [ai, setAi] = useState(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState(null);

  const fetchAi = async (retry = false) => {
    try {
      setLoadingAi(true);
      setAiError(null);
      const res = await api.get(`/stocks/${code}/analysis/chart`, {params: { chartType: candleType, retry },});
      setAi(res.data);


    } catch (err) {
      console.error("차트 AI 분석 오류:", err);
      setAiError(err);
      setAi(null);
    } finally {
      setLoadingAi(false);
    }
  };


  useEffect(() => {
    if (!code || !candleType) return;

    fetchAi();
  }, [code, candleType]);

  return { fetchAi, ai, loadingAi, aiError };
}
