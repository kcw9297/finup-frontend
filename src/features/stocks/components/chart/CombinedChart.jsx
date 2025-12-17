import { useEffect,  useState } from "react";
import CandleChart from "./CandleChart";
import VolumeChart from "./VolumeChart";
import { chartGuide } from "../../hooks/useChartGuide";
import ChipBar from "./ChipBar";
import VolumeChipBar from "./VolumeChipBar";
import { Button } from "@mui/material";


export default function CombinedChart({items}){
  const [upperTimeScale, setUpperTimeScale] = useState(null);
  const [chipData, setChipData] = useState(null);
  const [volumeChipData, setVolumeChipData] = useState(null);
  const [showGuideButton, setShowGuideButton] = useState(true);

  useEffect(()=>{
    if(!localStorage.getItem("chart_tutorial_done")){
      setTimeout(()=>{
        chartGuide();
        localStorage.setItem("chart_tutorial_done","true")
      },300)
    }
    setShowGuideButton(true)
  },[items])
  
  const showGuide = () => {
    chartGuide()
  }

  return(<div id="chart-area" style={{ display: "flex", flexDirection: "column", width: "100%", position: "relative" }}>
    {showGuideButton && (
      <Button 
        variant="outlined" 
        size="small" 
        onClick={showGuide} 
        sx={{position: "absolute", right: 10, top:10, zIndex: 10, background: "white"}}
      >
        가이드 보기
      </Button>
    )}
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