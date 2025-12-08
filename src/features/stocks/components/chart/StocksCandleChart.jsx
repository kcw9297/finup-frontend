import { useEffect, useRef } from "react";
import { createChart, ColorType } from "lightweight-charts";

function converDate(yyyymmdd){
  return (
    yyyymmdd.slice(0,4) +
    "-" +
    yyyymmdd.slice(4,6) +
    "-" +
    yyyymmdd.slice(6,8)
  );
}
export default function StocksCandleChart({ items }) {
  const ref = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!ref.current || !items || items.length === 0) return;

    // 기존 차트 제거
    if (chartRef.current) chartRef.current.remove();

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 520, // 토스 비슷하게 높이 넉넉하게
      layout: {
        background: { type: ColorType.Solid, color: "#ffffff" },
        textColor: "#222",
      },
      grid: {
        vertLines: { color: "#f0f0f0" },
        horzLines: { color: "#f0f0f0" },
      },
      crosshair: { mode: 1 },
      rightPriceScale: { borderColor: "#ccc" },
      timeScale: { borderColor: "#ccc" },
    });

    chartRef.current = chart;

    // ------------------------
    // 1) 캔들 시리즈
    // ------------------------
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#e74c3c",
      downColor: "#3498db",
      borderDownColor: "#3498db",
      borderUpColor: "#e74c3c",
      wickDownColor: "#3498db",
      wickUpColor: "#e74c3c",
    });

    const sorted = [...items].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    const candleData = sorted.map((i) => ({
      time: converDate(i.stck_bsop_date),
      open: Number(i.stck_oprc),
      high: Number(i.stck_hgpr),
      low: Number(i.stck_lwpr),
      close: Number(i.stck_clpr),
    }));
    console.log("candleData", candleData)
    candleSeries.setData(candleData);

    // ------------------------
    // 2) 거래량 시리즈 (토스처럼 크게!)
    // ------------------------
    const volumeSeries = chart.addHistogramSeries({
      priceScaleId: "volume",
      priceFormat: { type: "volume" },
      scaleMargins: {
        top: 0.68,  // 캔들 68%
        bottom: 0,  // 거래량 32%
      },
    });

    const volumeData = sorted.map((i) => ({
      time: converDate(i.stck_bsop_date),
      value: Number(i.acml_vol || 0),
      color: Number(i.stck_clpr) >= Number(i.stck_oprc)
        ? "rgba(231,76,60,0.8)"
        : "rgba(52,152,219,0.8)",
    }));
    console.log("volumeData", volumeData)
    volumeSeries.setData(volumeData);

    // ------------------------
    // 3) 거래량 MA20 (토스 특징)
    // ------------------------
    function calcVolumeMA(data, window) {
      if (data.length < window) return [];

      const result = [];
      for (let i = window - 1; i < data.length; i++) {
        const slice = data.slice(i - window + 1, i + 1);
        const sum = slice.reduce((acc, v) => acc + v.value, 0);

        result.push({
          time: data[i].time,
          value: sum / window,
        });
      }
      return result;
    }

    const ma20Data = calcVolumeMA(volumeData, 20);

    if (ma20Data.length > 0) {
      const ma20 = chart.addLineSeries({
        color: "#2ecc71", // 토스 스타일 녹색 MA라인
        lineWidth: 2,
        priceScaleId: "volume",
      });

      ma20.setData(ma20Data);
    }
    // ------------------------
    // 4) MA시리즈 
    // ------------------------
    function calcMA(data, window) {
      if (data.length < window) return [];

      const result = [];
      for (let i = window - 1; i < data.length; i++) {
        const slice = data.slice(i - window + 1, i + 1);
        const sum = slice.reduce((acc, v) => acc + v.close, 0);

        result.push({
          time: data[i].time,
          value: sum / window,
        });
      }
      return result;
    }

    const ma5 = calcMA(candleData, 5);
    if (ma5.length > 0) {
      const ma5Series = chart.addLineSeries({ color: "#FF4D4D", lineWidth: 2 });
      ma5Series.setData(ma5);
    }
    console.log("ma5Data", ma5);

    const ma20 = calcMA(candleData, 20);
    if (ma20.length > 0) {
      const ma20Series = chart.addLineSeries({ color: "#3A7AFE", lineWidth: 2 });
      ma20Series.setData(ma20);
    }
    console.log("ma20", ma20);
    
    const ma60 = calcMA(candleData, 60); // 30일가지고는 표시가 안됨
    if (ma60.length > 0) {
      const ma60Series = chart.addLineSeries({ color: "#9B59B6", lineWidth: 2 });
      ma60Series.setData(ma60);
    } 
    console.log("ma60", ma60);
    
    // ------------------------
    // 반응형
    // ------------------------
    const resize = () => {
      chart.applyOptions({ width: ref.current.clientWidth });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, [items]);

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "520px",
        position: "relative",
      }}
    />
    
  );
}
