import { Box, Chip, CircularProgress, IconButton, Paper, Skeleton, ToggleButton, Tooltip, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import CandleTypeTabs from "./chart/CandleTypeTabs.jsx";
import { useStocksDetailChart } from "../hooks/useStocksDetailChart.js";
import {chartToolTipText} from "../constants/stocksToolTipText.js";
import { useContext, useState } from "react";
import CombinedChart from "./chart/CombinedChart.jsx";
import RefreshIcon from '@mui/icons-material/Refresh';
import StocksDetailTooltip from "./StocksDetailTooptip.jsx";
import StocksDetailChartAi from "./StocksDetailChartAi.jsx";
import { useStocksDetailChartAi } from "../hooks/useStocksDetailChartAi.js";
import { useParams } from "react-router-dom";

export default function StocksDetailChart(){

  const { code } = useParams()
  const [ candleType, setCandleType ] = useState("DAY")
  const { items, loading } = useStocksDetailChart(code)
  const { fetchAi, ai, loadingAi, aiError } = useStocksDetailChartAi(code, candleType);
  
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
          <Box sx={{ 
            flexBasis:"70%", 
            flexShrink: 0, 
            background: "#ffffff", 
            p: 2, 
            borderRadius: 2, 
            border:1, 
            borderColor:'line.main', 
            height:700, 
            mb:2, 
            marginLeft:"16px",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
          }}>
            {loading && (
              <CircularProgress size={40} />
            )}
            
            {!loading && candles.length > 0 && (
              <CombinedChart candles={candles} />
            )}
            
            {!loading && candles.length === 0 && (
              <Typography 
                color="text.secondary" 
                fontSize="0.9rem"
                sx={{ 
                  whiteSpace: 'pre-line',
                  textAlign: 'center'
                }}
              >
                차트 데이터를 불러오지 못했습니다.{'\n'}
                잠시 후에 다시 시도해 주세요.
              </Typography>
            )}
          </Box>
        </Box>
          <Box sx={{ flexBasis:"30%", flexShrink:0, display:"flex", flexDirection:"column", maxWidth:600, minWidth:300, mt: 2}}>
            <Paper sx={{ flex: 1, p: 2, borderRadius: 2 }} elevation={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.2rem" }}>
                  AI 차트 분석
                </Typography>
                
                <Tooltip title="재추천">
                  <span>
                    <IconButton
                      size="small"
                      disabled={loadingAi}
                      sx={{
                        border: '1px solid',
                        borderColor: 'line.dark',
                        borderRadius: 1,
                        width: 32,
                        height: 32
                      }}
                      onClick={() => {
                        fetchAi(true)
                      }}
                    >
                      <RefreshIcon fontSize="small" />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>

              {loadingAi && (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1, 
                  mt: 2,
                  minHeight: 200 
                }}>
                  <Skeleton variant="text" width="90%" height={24} />
                  <Skeleton variant="text" width="90%" height={24} />
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="75%" height={24} />
                  <Skeleton variant="text" width="75%" height={24} />
                  <Skeleton variant="text" width="85%" height={24} />
                  <Skeleton variant="text" width="90%" height={24} />
                  <Skeleton variant="text" width="80%" height={24} />
                </Box>
              )}

              {!loadingAi && ai && (
                <StocksDetailChartAi ai={ai} />
              )}

              {!loadingAi && !ai && !aiError && (
                <Box sx={{ 
                  minHeight: 200, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Typography 
                    color="text.secondary" 
                    fontSize="0.9rem"
                    sx={{ 
                      whiteSpace: 'pre-line',
                      textAlign: 'center'
                    }}
                  >
                    차트 분석에 실패했습니다.{'\n'}
                    다시 시도해 주세요.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>
  )
  
}