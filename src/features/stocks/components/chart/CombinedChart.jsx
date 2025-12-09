import { useMemo, useState } from "react";
import CandleChart from "./CandleChart";
import VolumeChart from "./VolumeChart";
import { range } from "d3";

export default function CombinedChart({items}){
  const [upperTimeScale, setUpperTimeScale] = useState(null);
  const [lowerTimeScale, setLowerTimeScale] = useState(null);
  
  if (!items || items.length === 0) {
    return <div>차트 데이터 없음</div>;
  }
  return(<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <CandleChart 
      items={items} 
      onTimeScaleReady={(ts) => setUpperTimeScale(ts)}
      // onRangeChange={(range) => {
      //   lowerTimeScale.setVisibleLogicalRange(range)
      // }}
    />
    <VolumeChart 
      items={items} 
      upperTimeScale={upperTimeScale}
      // onRangeChange={(range) => {
      //   upperTimeScale?.setVisibleLogicalRange(range);
      // }}
    />
  </div>)
}