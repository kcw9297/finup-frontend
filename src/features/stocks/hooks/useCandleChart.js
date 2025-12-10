import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { locale } from "moment/moment";

export function useCandleChart(containerRef, items, onTimeScaleReady, onCrosshairDataChange ) {
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const ma5Ref = useRef(null);
  const ma20Ref = useRef(null);
  const ma60Ref = useRef(null);

  // Chart 생성 + 시리즈 생성
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 350,
      layout: { background: { color: "#fff" }, textColor: "#333" },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: { borderColor: "#ddd" },
      rightPriceScale: { borderColor: "#ddd" },
    });
    
    chart.applyOptions({
      localization: {
        locale: 'ko-KR',
        timeFormatter:(time) => {
          if(typeof time === "object" && time.year){
            const y = time.year
            const m = String(time.month).padStart(2, "0")
            const d = String(time.day).padStart(2, "0")
            return `${y}-${m}-${d}`;
          }
          const date = new Date(time * 100)
          const y = date.getFullYear()
          const m = String(date.getMonth()+1).padStart(2, "0")
          const d = String(date.getDate()).padStart(2, "0")

          return `${y}-${m}-${d}`;
        }
      }
    });
    
    chartRef.current = chart;
    
    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#ef5350",
      downColor: "#3b82f6",
      borderVisible: false,
      wickUpColor: "#ef5350",
      wickDownColor: "#3b82f6",
    });

    ma5Ref.current = chart.addLineSeries({ 
      color: "#16a34a", //초록
      lineWidth: 1 ,
    });
    ma20Ref.current = chart.addLineSeries({ 
      color: "#ef5350", lineWidth: 1 //빨강
    });
    ma60Ref.current = chart.addLineSeries({ 
      color: "#BB6BD9", lineWidth: 1 //보라
    });

    // 리사이즈 핸들링
    const resize = () => {
      if (!containerRef.current || !chartRef.current) return;
      chartRef.current.applyOptions({
        width: containerRef.current.clientWidth,
      });
    };
    window.addEventListener("resize", resize);
    
    if(typeof onTimeScaleReady === "function"){
      onTimeScaleReady(chart.timeScale())
    }

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, []);

  // 데이터 반영
  useEffect(() => {
    if (!items || !chartRef.current) return;

    const mapDate = (d) => `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;

    candleSeriesRef.current.setData(
      items.map((i) => ({
        time: mapDate(i.stck_bsop_date),
        open: Number(i.stck_oprc),
        high: Number(i.stck_hgpr),
        low: Number(i.stck_lwpr),
        close: Number(i.stck_clpr),
      }))
    );

    ma5Ref.current.setData(
      items.filter((i) => i.ma5).map((i) => ({
        time: mapDate(i.stck_bsop_date),
        value: Number(i.ma5),
      }))
    );

    ma20Ref.current.setData(
      items.filter((i) => i.ma20).map((i) => ({
        time: mapDate(i.stck_bsop_date),
        value: Number(i.ma20),
      }))
    );

    ma60Ref.current.setData(
      items.filter((i) => i.ma60).map((i) => ({
        time: mapDate(i.stck_bsop_date),
        value: Number(i.ma60),
      }))
    );

    chartRef.current.timeScale().fitContent();
  }, [items]);

  // Crosshair Tooltip
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time) {
        onCrosshairDataChange?.(null)
        return;
      }

      const price = param.seriesPrices.get(candleSeriesRef.current);
      const ma5 = param.seriesPrices.get(ma5Ref.current);
      const ma20 = param.seriesPrices.get(ma20Ref.current);
      const ma60 = param.seriesPrices.get(ma60Ref.current);
      
      onCrosshairDataChange?.({
        open:price.open,
        high: price.high,
        low: price.low,
        close: price.close,
        ma5,
        ma20,
        ma60,
      })
    });
  }, []);
}
