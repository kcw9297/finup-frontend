import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

export default function VolumeChart({ items, upperTimeScale }) {
  const chartRef = useRef(null);
  const containerRef = useRef(null);
  const volumeSeriesRef = useRef(null);
  const volMARef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const chart = createChart(containerRef.current, {
      height: 180,
      layout: { background: { color: "#fff" }, textColor: "#333" },
      grid: {
        vertLines: { color: "#fff" },
        horzLines: { color: "#eee" },
      },
      timeScale: { borderColor: "#ddd" },
      rightPriceScale: { borderColor: "#ddd" },
    });
    chartRef.current = chart

    volumeSeriesRef.current = chart.addHistogramSeries({
      color: "#26a69a",
      priceFormat: { type: "volume" },
      scaleMargins: { top: 0, bottom: 0 },
    });
    volMARef.current = chart.addLineSeries({color:"#16a34a"})
    return () => chart.remove()
  },[]);
  useEffect(()=>{
    if (!items || !chartRef.current) return;
    
    const mapDate = (d) => `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
    
    volumeSeriesRef.current.setData(
      items.map((i) => ({
        time: mapDate(i.stck_bsop_date),
        value: Number(i.acml_vol),
        color: Number(i.stck_clpr) >= Number(i.stck_oprc) ? "#d73027" : "#4575b4",
      }))
    );

    volMARef.current.setData(
      items
        .filter(i => i.volumeMa20 !== null)
        .map(i => ({
          time: mapDate(i.stck_bsop_date),
          value: Number(i.volumeMa20)
        }))
    );

    chartRef.current.timeScale().fitContent();

    // return () => {
    //   if (chartRef.current) {
    //     try {
    //       chartRef.current.remove();
    //     } catch (e) {
    //       console.warn("chart remove error", e);
    //     }
    //     chartRef.current = null;
    //   }
    // };
  }, [items]);

  useEffect(()=>{
    if(!chartRef.current || !upperTimeScale) return;
    
    const handler = range => {
      chartRef.current.timeScale().setVisibleLogicalRange(range)
    }
    upperTimeScale.subscribeVisibleLogicalRangeChange(handler)
    return () => {
      upperTimeScale.unsubscribeVisibleLogicalRangeChange(handler)
    }
  },[upperTimeScale])

  return (<div ref={containerRef} style={{ width: "100%" }}/>);
}
