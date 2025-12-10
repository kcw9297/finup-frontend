import { useEffect,  useState } from "react";
import CandleChart from "./CandleChart";
import VolumeChart from "./VolumeChart";
import { chartGuide } from "../../hooks/ChartGuide";
import ChipBar from "./ChipBar";
import VolumeChipBar from "./VolumeChipBar";

export default function CombinedChart({items}){
  const [upperTimeScale, setUpperTimeScale] = useState(null);
  const [chipData, setChipData] = useState(null);
  const [volumeChipData, setVolumeChipData] = useState(null);
  useEffect(()=>{
    if(!localStorage.getItem("chart_tutorial_done")){
      setTimeout(()=>{
        chartGuide()
      },500)
      localStorage.setItem("chart_tutorial_done","true")
    }
  },[])

  return(<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
    <ChipBar
      ohlc={{
        open: chipData?.open,
        high: chipData?.high,
        low: chipData?.low,
        close: chipData?.close,
      }}
      ma={{
        ma5: chipData?.ma5,
        ma20: chipData?.ma20,
        ma60: chipData?.ma60,
      }}
    />
    <CandleChart 
      items={items} 
      onTimeScaleReady={(ts) => setUpperTimeScale(ts)}
      onCrosshairDataChange={setChipData}
    />
    <VolumeChipBar
      volume={{
        volume: volumeChipData?.volume,
        volMa20: volumeChipData?.volMa20,
      }}
    />
    <VolumeChart 
      items={items} 
      upperTimeScale={upperTimeScale}
      onCrosshairDataChange={setVolumeChipData}
    />
  </div>)
}