import { Box, Paper, ToggleButton, Typography } from "@mui/material";
import thema from "../../../base/design/thema.js"
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import StocksChart from "./StocksChart.jsx";
import CandleTypeTabs from "./CandleTypeTabs.jsx";
import { useState } from "react";
import CandleTooltip from "./CandleToopTip.jsx";
import { candleTooltipText } from "../constants/chartToolTipText.js";

export default function StocksDetailChart(){
  const [candleType, setCandleType] = useState("day");
  const dummyItems = [
    { stck_bsop_date: "20240101", stck_clpr: "260000" },
    { stck_bsop_date: "20240102", stck_clpr: "264000" },
    { stck_bsop_date: "20240103", stck_clpr: "259000" },
    { stck_bsop_date: "20240104", stck_clpr: "262000" },
    { stck_bsop_date: "20240105", stck_clpr: "265000" },
  ];

  return(
    <Box sx={{backgroundColor: thema.palette.background.base}}>
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon text={"차트에 마우스를 올리면 쉬운 설명을 볼 수 있어요!"} />
      </Box>
      <CandleTypeTabs 
        value={candleType} 
        onChange={(e,v) => v && setCandleType(v)} 
        renderButton={(type) => (
          <CandleTooltip text={candleTooltipText[type]}>
            <ToggleButton value={type}>
              {type === "day" && "일"}
              {type === "week" && "주"}
              {type === "month" && "월"}
            </ToggleButton>
          </CandleTooltip>
      )} />
      <Box sx={{display: "flex", gap: 3, mt: 2}}>
        
        <Box sx={{ flex: 2, background: "#ffffff", p: 2, borderRadius: 2, boxShadow: 1 }}>
          <StocksChart items={dummyItems} />
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