import { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { useCandleChart } from "../../hooks/useCandleChart";

export default function CandleChart({ items, onTimeScaleReady, onCrosshairDataChange  }) {
  const containerRef = useRef(null);
  
  useCandleChart(containerRef, items, onTimeScaleReady, onCrosshairDataChange )

  return (
    <div style={{position:"relative", width:"100%"}}>
      <div id="candle-chart-area" ref={containerRef} style={{ width: "100%" }} />

    </div>
  )
}
