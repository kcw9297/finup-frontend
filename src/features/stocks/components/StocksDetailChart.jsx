import { Box, Chip, Paper, ToggleButton, Tooltip, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import CandleTypeTabs from "./chart/CandleTypeTabs.jsx";
import StocksCandleChart from "./chart/StocksCandleChart.jsx";
import { useStocksDetailChart } from "../hooks/useStocksDetailChart.js";
import StocksDetailTooltip from "./StocksDetailToopTip.jsx";
import {chartToolTipText} from "../constants/stocksToolTipText.js";
import { useContext } from "react";
import { StockDetailContext } from "../context/StockDetailContext.js";
import CandleChart from "./chart/CandleChart.jsx";
import CombinedChart from "./chart/CombinedChart.jsx";

export default function StocksDetailChart(){
  const { nameCard } = useContext(StockDetailContext); 
  const {items, candleType, setCandleType, loading, error} = useStocksDetailChart("005930"); //nameCard.stockName

  return(
    <Box sx={{backgroundColor: thema.palette.background.base}}>
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon text={"차트에 마우스를 올리면 쉬운 설명을 볼 수 있어요!"} />
      </Box>
      <CandleTypeTabs 
        value={candleType} 
        onChange={(e,v) => v && setCandleType(v)} 
        renderButton={(type) => (
          <StocksDetailTooltip text={chartToolTipText[type]}>
            <ToggleButton value={type}>
              {type === "day" && "일"}
              {type === "week" && "주"}
              {type === "month" && "월"}
            </ToggleButton>
          </StocksDetailTooltip>
      )} />
      
      <Box sx={{display: "flex", gap: 3, mt: 2}}>
        
        <Box sx={{ flex: 3, flexShrink: 0, background: "#ffffff", p: 2, borderRadius: 2, boxShadow: 1, height:700, mb:2}}>
          <Box sx={{
            display: "flex",
            gap: 2,
            mt: 1,
            mb: 1,
            alignItems: "center"
          }}>
            <Tooltip title="최근 5일 종가 평균">
              <Chip label="MA5" sx={{ background: "#FF4D4D", color: "white" }} />
            </Tooltip>

            <Tooltip title="최근 20일 종가 평균">
              <Chip label="MA20" sx={{ background: "#3A7AFE", color: "white" }} />
            </Tooltip>

            <Tooltip title="최근 60일 종가 평균">
              <Chip label="MA60" sx={{ background: "#9B59B6", color: "white" }} />
            </Tooltip>
          </Box>
          {items.length > 0 && (
            <CombinedChart items={items} />
          )}
        </Box>

        <Paper sx={{ flex: 1, p: 2, borderRadius: 2 }} elevation={1}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            AI 분석
          </Typography>

          {/* 여기는 나중에 실제 AI 분석 출력되는 부분 */}
          <Box
            sx={{
              height: "500px",
              border: "1px solid #ddd",
              borderRadius: 2,
              p: 2,
              background: "#fafafa",
            }}
          >
            <Typography color="text.secondary">
              AI 분석 내용이 여기에 표시됩니다.
            </Typography>
          </Box>
        </Paper>
      </Box>
      
    </Box>
  )
  
}