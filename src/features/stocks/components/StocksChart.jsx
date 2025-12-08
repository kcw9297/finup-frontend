import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function StocksChart({items}){
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // 이동평균 계산 함수
  function ma(arr, window) {
    return arr.map((v, i) =>
      i < window ? null : arr.slice(i - window, i).reduce((a, b) => a + b, 0) / window
    );
  }

  useEffect(() => {
    if (!items || items.length === 0) return;

    // 날짜 역순 (KIS: 최신→과거)
    const sorted = [...items].reverse();

    const labels = sorted.map(i => i.stck_bsop_date);
    const closes = sorted.map(i => Number(i.stck_clpr));

    const ma5 = ma(closes, 5);
    const ma20 = ma(closes, 20);
    const ma60 = ma(closes, 60);

    // 기존 차트 제거
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // 새 차트 생성
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "종가",
            data: closes,
            borderColor: "#007bff",
            borderWidth: 2,
            pointRadius: 0,
          },
          {
            label: "MA5",
            data: ma5,
            borderColor: "red",
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            label: "MA20",
            data: ma20,
            borderColor: "orange",
            borderWidth: 1.5,
            pointRadius: 0,
          },
          {
            label: "MA60",
            data: ma60,
            borderColor: "green",
            borderWidth: 1.5,
            pointRadius: 0,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit: 15 } }
        }
      }
    });
  }, [items]);

  return (
    <div style={{ height: "350px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}