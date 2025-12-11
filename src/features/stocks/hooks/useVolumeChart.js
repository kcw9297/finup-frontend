import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

export function useVolumeChart(containerRef, items, upperTimeScale, onCrosshairDataChange){
  const chartRef = useRef(null)
  const volumeSeriesRef = useRef(null)
  const volMARef = useRef(null)

  useEffect(() => {
      if (!containerRef.current) return;
  
      const width = containerRef.current.clientWidth;
  
      const chart = createChart(containerRef.current, {
        width,
        height: 180,
        layout: { background: { color: "#fff" }, textColor: "#333" },
        grid: {
          vertLines: { color: "#fff" },
          horzLines: { color: "#eee" },
        },
        timeScale: { borderColor: "transparent" },
        rightPriceScale: { borderColor: "#ddd" },
      });
      chartRef.current = chart
  
      volumeSeriesRef.current = chart.addHistogramSeries({
        color: "#26a69a",
        priceFormat: { type: "volume" },
        scaleMargins: { top: 0, bottom: 0 },
      });
      volMARef.current = chart.addLineSeries({
        color:"#16a34a",
        lineWidth: 1
      })
      const resize = () => {
        if(containerRef.current && chartRef.current){
          chartRef.current.applyOptions({
            width: containerRef.current.clientWidth
          })
        }
      }
      window.addEventListener("resize", resize)
      return () => 
        {
          window.removeEventListener("resize", resize)
          chart.remove()
        }
    },[]);

    useEffect(()=>{
    if (!volumeSeriesRef.current || !chartRef.current) return;
    
    const mapDate = (d) => `${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6,8)}`;
    
    volumeSeriesRef.current.setData(
      items.map((i) => ({
        time: mapDate(i.stck_bsop_date),
        value: Number(i.acml_vol),
        color: Number(i.stck_clpr) >= Number(i.stck_oprc) ? "#ef5350" : "#3b82f6",
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
  }, [items]);
  
  useEffect(()=>{
    if(!chartRef.current || !volumeSeriesRef.current) return;

    chartRef.current.subscribeCrosshairMove((param) => {
      if(!param.time){
        onCrosshairDataChange?.(null)
        return
      }
      
      const volume = param.seriesPrices.get(volumeSeriesRef.current) ?? null;
      const volMa20 = param.seriesPrices.get(volMARef.current);

      onCrosshairDataChange?.({
        volume,
        volMa20
      })
    })
  },[])

  useEffect(()=>{
    if(!chartRef.current || !upperTimeScale) return;
    
    const handler = (range) => {
      chartRef.current.timeScale().setVisibleLogicalRange(range)
    }
    upperTimeScale.subscribeVisibleLogicalRangeChange(handler)
    
    return () => {
      upperTimeScale.unsubscribeVisibleLogicalRangeChange(handler)
    }
  },[upperTimeScale])
}