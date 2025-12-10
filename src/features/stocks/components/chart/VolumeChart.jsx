import { useRef } from "react";
import { useVolumeChart } from "../../hooks/useVolumeChart";

export default function VolumeChart({ items, upperTimeScale, onCrosshairDataChange }) {
  
  const containerRef = useRef(null);

  useVolumeChart(containerRef, items, upperTimeScale, onCrosshairDataChange)
  
  return (<div id="volume-chart-area" ref={containerRef} style={{ width: "100%" }}/>);
}
