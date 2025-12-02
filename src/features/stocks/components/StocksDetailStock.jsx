import React from "react";
import { Box, Grid, Typography, Stack, Divider  } from "@mui/material";
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

export default function StocksDetailStock(){
  const rows = [
    { label: "52주 최고가", value: "112,400원", color: "#F15764" },
    { label: "52주 최저가", value: "50,800원", color: "#3282F6" },
    { label: "250일 최고가", value: "112,400원", color: "#F15764" },
    { label: "250일 최저가", value: "50,800원", color: "#3282F6" },
  ];

  return (
    // <Box>
    <Box sx={{backgroundColor: "#FFFFFF"}}>

      {/* 학습방법 설명 박스 */}
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon />
      </Box>
      <Box sx={{px: 3, display: "flex", flexDirection: "column", gap: 5 }}>
        {/* 기본정보 */}
        <Box>
          {/* 종목명 */}
          <Box sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "flex-end", // 세로 기준 아래 정렬          
          }}>
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
            <Grid container sx={{ justifyContent: "space-between" }}>
              {[
                { label: "업종", value: "전기·전자" },
                { label: "액면가", value: "100원" },
                { label: "시가총액", value: "648조 9,365억원" },
                { label: "상장주수", value: "6,735,612,586주" },
              ].map((item, index) => (
                <Grid
                  item               
                  key={index}
                  sx={{                  
                    justifyContent: "space-between",
                    display: "flex",                  
                    alignItems: "center",
                    width: "23%",                  
                    px: 1,
                    py: 2,
                    gap: 3,
                    borderBottom: "1px solid #B0C3EB",
                  }}
                >
                  <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center'}}>{item.label}
                    <Box sx={{ color: "#B0C3EB", display: 'flex', alignItems: 'center', px: 1 }}>
                      <InfoIcon/>            
                    </Box>
                  </Typography>                                  
                  <Typography fontWeight={500}>{item.value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* 투자지표 */}
        <Box sx={{display: "flex", flexDirection: "column", gap: 3 }}>
          <Box sx={{display: "flex"}}>
            <Typography variant="h5" fontWeight={600}>
              투자지표
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", px: 2, gap: 2, overflow: "hidden" }}>
            <InfoCard title="가격" rows={rows} />
            <InfoCard title="가격" rows={rows} />
            <InfoCard title="가격" rows={rows} />
            <InfoCard title="가격" rows={rows} />
          </Box>
        </Box>


      </Box>
    </Box>
  );
}

function InfoCard({ title, rows }) {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        background: "#F1F4F7",
        borderRadius: 2,
      }}
    >
      {/* 제목 */}
      <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
        <Typography fontSize={16} fontWeight={400}>
          {title}
        </Typography>
      </Box>

      {/* 반복되는 행 */}
      {rows.map((item, i) => (
        <Box key={i}>
          <Box
            sx={{
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* 왼쪽 영역 */}
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontSize={16}>{item.label}</Typography>                  
              <Box sx={{ color: "#B0C3EB", display: 'flex', alignItems: 'center', px: 1 }}>
                <InfoIcon/>            
              </Box>
            </Stack>

            {/* 오른쪽 값 */}
            <Typography
              fontSize={16}
              sx={{ color: item.color }}
              textAlign="right"
            >
              {item.value}
            </Typography>
          </Box>

          {/* 행 구분선 */}
          {i < rows.length - 1 && <Divider sx={{ borderColor: "#B0C3EB" }} />}
        </Box>
      ))}
    </Box>
  );
}

