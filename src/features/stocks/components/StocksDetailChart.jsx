import { Box, Chip, Paper, Skeleton, ToggleButton, Tooltip, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import CandleTypeTabs from "./chart/CandleTypeTabs.jsx";
import { useStocksDetailChart } from "../hooks/useStocksDetailChart.js";
import {chartToolTipText} from "../constants/stocksToolTipText.js";
import { useContext, useState } from "react";
import CombinedChart from "./chart/CombinedChart.jsx";
import StocksDetailTooltip from "./StocksDetailTooptip.jsx";
import StocksDetailChartAi from "./StocksDetailChartAi.jsx";
import { useStocksDetailChartAi } from "../hooks/useStocksDetailChartAi.js";
import { useParams } from "react-router-dom";

export default function StocksDetailChart(){

  const { code } = useParams()
  const [ candleType, setCandleType ] = useState("DAY")
  const { items, loading } = useStocksDetailChart(code)
  const { ai, loadingAi, aiError } = useStocksDetailChartAi(code, candleType);
  
  const dayCandles = items?.dayCandles || []
  const weekCandles = items?.weekCandles || []
  const monthCandles = items?.monthCandles || []

  const candles = candleType === "DAY" ? dayCandles : 
                  candleType === "WEEK" ? weekCandles : 
                  candleType === "MONTH" ? monthCandles : []
  

  return(
    <Box sx={{backgroundColor: thema.palette.background.base, minHeight:"100vh", width:"100%"}}>
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon text={"차트에 마우스를 올리면 쉬운 설명을 볼 수 있어요!"} />
      </Box>
      <Box sx={{width: "1400px", display:"flex", flexDirection:"row"}}>
        <Box sx={{width: "1000px", mx: "auto", display: "flex", flexDirection:"column", gap: 3, mt: 2}}>
          <Box sx={{marginLeft:"16px"}}>
            <CandleTypeTabs 
              value={candleType} 
              onChange={(e,v) => v && setCandleType(v)} 
              renderButton={(type) => (
                <StocksDetailTooltip text={chartToolTipText[type]}>
                  <ToggleButton value={type}>
                    {type === "DAY" && "일"}
                    {type === "WEEK" && "주"}
                    {type === "MONTH" && "월"}
                  </ToggleButton>
                </StocksDetailTooltip>
            )} />
          </Box>
          <Box sx={{ flexBasis:"70%", 
            flexShrink: 0, 
            background: "#ffffff", 
            p: 2, 
            borderRadius: 2, 
            border:1, 
            borderColor:'line.main' , 
            height:700, 
            mb:2, 
            marginLeft:"16px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
            }}>
              {
                loading ? (<Skeleton height={20} width={100} />) : 
                candles.length > 0 ? (<CombinedChart candles={candles} />) : (<Typography color="text.secondary">차트 데이터가 없습니다.</Typography>)
              }
              
            
          </Box>
        </Box>
          <Box sx={{ flexBasis:"30%", flexShrink:0, display:"flex", flexDirection:"column", maxWidth:400, minWidth:300, mt: 2}}>
            <Paper sx={{ flex: 1, p: 2, borderRadius: 2 }} elevation={1}>
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                AI 분석
              </Typography>
              {loadingAi && (
                <Typography color="text.secondary" fontSize="0.9rem">
                  차트 데이터를 분석하는 중이에요...
                </Typography>
              )}
              {!loadingAi && ai && (
                <StocksDetailChartAi ai={ai} />
              )}
              {!loadingAi && !ai && !aiError && (
                <Typography color="text.secondary" fontSize="0.9rem">
                  분석할 데이터가 없습니다.
                </Typography>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
  )
  
}