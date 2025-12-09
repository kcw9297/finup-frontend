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
    const width = containerRef.current.clientWidth;

    const chart = createChart(containerRef.current, {
      width,
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
    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    ma5Ref.current = chart.addLineSeries({ color: "#ff5c5c" });
    ma20Ref.current = chart.addLineSeries({ color: "#3b82f6" });
    ma60Ref.current = chart.addLineSeries({ color: "#9333ea" });

    onTimeScaleReady(chart.timeScale());
    const handleResize = () => {
      if(containerRef.current && chartRef.current){
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        })
      }
    }
    window.addEventListener("resize", handleResize)
    return () => 
      {
        window.removeEventListener("resize", handleResize)
        chart.remove()
      };
  },[]);
  
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current) return;

    const ohlcBox = document.getElementById("ohlc-box");

    chartRef.current.subscribeCrosshairMove((param) => {
      if (!param.time) {
        ohlcBox.innerHTML = `<b>—</b>`;
        return;
      }

      const price = param.seriesPrices.get(candleSeriesRef.current);
      if (!price) {
        ohlcBox.innerHTML = `<b>—</b>`;
        return;
      }

      const timeStr =
        typeof param.time === "string"
          ? param.time
          : `${param.time.year}-${String(param.time.month).padStart(2, "0")}-${String(param.time.day).padStart(2, "0")}`;

      ohlcBox.innerHTML = `
        <b>${timeStr}</b><br />
        시가: ${price.open.toLocaleString()}<br />
        고가: ${price.high.toLocaleString()}<br />
        저가: ${price.low.toLocaleString()}<br />
        종가: ${price.close.toLocaleString()}
      `;
    });
  }, []);

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

  }, [items]);

  return (
    <div style={{position:"relative", width:"100%"}}>
      <div ref={containerRef} style={{ width: "100%" }} />
      <div id="ohlc-box"
        style={{
          position: "absolute",
          top: 10,
          left: 5,
          background: "rgba(255,255,255,0.9)",
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: 11,
          lineHeight: "14px",
          pointerEvents: "none",
          zIndex: 20,
        }}></div>

    </div>
  )
}
