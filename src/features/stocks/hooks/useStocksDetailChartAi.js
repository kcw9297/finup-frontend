import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksDetailChartAi(code, candleType) {
  const [ai, setAi] = useState(null);        // StockChartDto.ChartAi
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiError, setAiError] = useState(null);

  useEffect(() => {
    if (!code || !candleType) return;

    const fetchAi = async () => {
      try {
        setLoadingAi(true);
        setAiError(null);

        const res = await api.get("/stocks/chart/ai", {
          params: { code, candleType },
        });

        // 컨트롤러에서 Api.ok(ai) 로 리턴했다고 가정
        setAi(res.data);
      } catch (err) {
        console.error("차트 AI 분석 오류:", err);
        setAiError(err);
        setAi(null);
      } finally {
        setLoadingAi(false);
      }
    };

    fetchAi();
  }, [code, candleType]);

  return { ai, loadingAi, aiError };
}
