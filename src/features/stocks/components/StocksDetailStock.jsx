import React from "react";
import { useParams } from "react-router-dom";
import thema from "../../../base/design/thema.js"
import { Box, Grid, Typography, Stack, Divider, Card, CardContent } from "@mui/material";
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘
//import { useStockDetail } from "../hooks/useStocksDetailStock.js";
import { useStockDetail } from "../hooks/useStocksDetail.js";

export default function StocksDetailStock(){
  const { code } = useParams();
  // const { headInfo, basic, price, valuation, flow, risk, loading} = useStockDetail(code);
  const { nameCard, detailStock, loading, error } = useStockDetail(code);

  const basicHead = detailStock.basicHead?.reduce((acc, item) => {
    acc[item.label] = item.value;
    return acc;
  }, {});

  return (
    // <Box>
    <Box sx={{backgroundColor: thema.palette.background.base}}>

      {/* 학습방법 설명 박스 */}
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon />
      </Box>
      <Box sx={{px: 3, width: "100%", display: "flex", flexDirection: "column", gap: 5 }}>
        {/* 기본정보 */}
        <Box sx={{display: "flex", flexDirection: "column", gap: 3 }}>
          {/* 종목명 헤더*/}
          <Box sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "flex-end", // 세로 기준 아래 정렬          
          }}>
            
            {/* { detailStock.basicHead?.map((item) => (
              <Typography variant= "body1" key={item.label}>
                {item.value}
              </Typography>
            ))}  */}

            <Typography variant="h5" fontWeight={600} >
              {basicHead?.["종목명"]}
            </Typography>
            <Typography variant="body1" /*color="text.secondary"*/>
              국내   
            </Typography>                    
            <Typography variant="body1" /*color="text.secondary"*/>
              {basicHead?.["종목코드"]}
            </Typography>
            <Typography variant="body1" /*color="text.secondary"*/>
              {basicHead?.["대표 시장 한글명"]}
            </Typography>
          </Box>

          {/* 정보 카드 */}
          <Box
            sx={{
              //backgroundColor: "white",
              borderRadius: 2,
              px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Grid container sx={{ justifyContent: "space-between" }}>
              { detailStock.basic?.map((item, index) => (
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
                    borderBottom: "1px solid #B0C3EB",
                  }}
                >
                  <Typography /*color="text.primary"*/ sx={{ display: 'flex', alignItems: 'center'}}>{item.label}
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
          
          <Box sx={{ display: "flex", px: 2, gap: 3, overflow: "hidden" }}>
            <InfoCard title="가격" rows={ detailStock.price } />
            <InfoCard title="가치평가" rows={ detailStock.valuation } />
            <InfoCard title="수급·거래" rows={ detailStock.flow } />
            <InfoCard title="리스크·상태" rows={ detailStock.risk } />
          </Box>
        </Box>

        {/* AI분석 */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
      
          {/* 제목 */}
          <Box sx={{display: "flex"}}>
            <Typography variant="h5" fontWeight={600}>
              AI 정리
            </Typography>
          </Box>
          
          {/* 내용 카드 */}
          <Card variant="outlined" sx={{ mx: 2, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="body1" sx={{ textAlign: "left", whiteSpace: "pre-line" }}>
                시가총액 / 업종 한글 종목명(전기전자) 상장주수
                {"\n"}누적 거래 대금, 거래량, 전일 대비 거래량 비율
                {"\n"}최고 최저 상한 하한
                {"\n"}250일 최저, 최고 (날짜)
                {"\n"}52주 최고 / 최저, 날짜, 현재가 대비
              </Typography>
            </CardContent>
          </Card>
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
        //background: "#F1F4F7",
        borderRadius: 4,
      }}
    >
      {/* 제목 */}
      <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
        <Typography fontSize={16} fontWeight={400}>
          {title}
        </Typography>
      </Box>

      {/* 반복되는 행 */}
      {rows?.map((item, i) => (
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

