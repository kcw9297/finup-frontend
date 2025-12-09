import { useMemo, useState } from "react";
import CandleChart from "./CandleChart";
import VolumeChart from "./VolumeChart";

export default function CombinedChart({items}){
  
  const [upperTimeScale, setUpperTimeScale] = useState(null);
  if (!items || items.length === 0) {
    return <div>차트 데이터 없음</div>;
  }
  return(<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <CandleChart items={items} onTimeScaleReady={(ts) => setUpperTimeScale(ts)}/>
    <VolumeChart items={items} upperTimeScale={upperTimeScale}/>
  </div>)
}