import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function CandleChart({ items, onTimeScaleReady }) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const ma5Ref = useRef(null);
  const ma20Ref = useRef(null);
  const ma60Ref = useRef(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const chart = createChart(containerRef.current, {
      height: 350,
      layout: { background: { color: "#fff" }, textColor: "#333" },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: { borderColor: "#ddd" },
      rightPriceScale: { borderColor: "#ddd" },
    });
    chartRef.current = chart;
    candleSeriesRef.current = chart.addCandlestickSeries();
    ma5Ref.current = chart.addLineSeries({ color: "#ff5c5c" });
    ma20Ref.current = chart.addLineSeries({ color: "#3b82f6" });
    ma60Ref.current = chart.addLineSeries({ color: "#9333ea" });

    onTimeScaleReady(chart.timeScale());

    return () => chart.remove();
  },[]);

  //items 변경 시 데이터만 갱신
  useEffect(() => {
    if(!items || !chartRef.current) return;
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
      items.filter(i=>i.ma5).map(i => ({ time: mapDate(i.stck_bsop_date), value: Number(i.ma5) }))
    );

    ma20Ref.current.setData(
      items.filter(i=>i.ma20).map(i => ({ time: mapDate(i.stck_bsop_date), value: Number(i.ma20) }))
    );

    ma60Ref.current.setData(
      items.filter(i=>i.ma60).map(i => ({ time: mapDate(i.stck_bsop_date), value: Number(i.ma60) }))
    );

    chartRef.current.timeScale().fitContent();

    // // 상단 차트의 timeScale 객체 넘겨준다 → 하단 차트에서 sync 용
    // chart.timeScale().fitContent();
    // if (!chartRef.current?._timeScaleSent) {
    //   onTimeScaleReady && onTimeScaleReady(chart.timeScale());
    //   chartRef.current._timeScaleSent = true;
    // }

    // chartRef.current = chart;

    // return () => {
    //   if (chartRef.current) {
    //     chartRef.current.remove();
    //     chartRef.current = null;
    //   }
    // };
  }, [items]);

  return <div ref={containerRef} style={{ width: "100%" }} />;
}
