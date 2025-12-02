import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";

export default function StocksDetailStock(){

  return (
    // <Box>
    <Box sx={{backgroundColor: "#FFFFFF"}}>

      {/* 학습방법 설명 박스 */}
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon />
      </Box>
      <Box sx={{px:3}}>
        {/* 종목명/기본정보 */}
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", flexDirection: "column", JustifyContent: "flex-end"}}>
          <Typography variant="h5" fontWeight={600}>
            삼성전자
          </Typography>
          <Typography variant="body1" color="text.secondary">
            국내
          </Typography>
          <Typography variant="body1" color="text.secondary">
            005930
          </Typography>
          <Typography variant="body1" color="text.secondary">
            코스피
          </Typography>
        </Box>

        {/* 정보 카드 */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          <Grid container spacing={2} sx={{ borderBottom: "1px solid #B0C3EB" }}>
            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography color="text.primary">업종</Typography>
              <Typography fontWeight={500}>전기·전자</Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography color="text.primary">액면가</Typography>
              <Typography fontWeight={500}>100원</Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography color="text.primary">시가총액</Typography>
              <Typography fontWeight={500}>648조 9,365억원</Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography color="text.primary">상장주수</Typography>
              <Typography fontWeight={500}>6,735,612,586주</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}


