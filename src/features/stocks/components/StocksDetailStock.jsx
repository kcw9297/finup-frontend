import React, { useContext } from "react";
import { StockDetailContext } from "../context/StockDetailContext";
import { useParams } from "react-router-dom";
import thema from "../../../base/design/thema.js"
import { Box, Grid, Typography, Stack, Divider, Card, CardContent, CardMedia, keyframes } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘
import StocksDetailTooltip from "./StocksDetailTooptip.jsx";
//import { useStockDetail } from "../hooks/useStocksDetailStock.js";
//import { useStockDetail } from "../hooks/useStocksDetail.js";

import {useRecommendedVideo} from "../../home/hooks/useRecommendedVideo.js"
import { useStockDetailStockAi } from "../hooks/useStocksDetailStockAi.js";

export default function StocksDetailStock(){
  const { code } = useParams();
  // const { headInfo, basic, price, valuation, flow, risk, loading} = useStockDetail(code);
  //const { nameCard, detailStock, loading, error } = useStockDetail(code);
  const { detailStock, loading } = useContext(StockDetailContext);
  const { detailStockAi, detailStockYoutube, loadingAi } = useStockDetailStockAi(code);
  const { videoList } = useRecommendedVideo();
  const sparkle = keyframes`
    0% { opacity: 0.4; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.15); }
    100% { opacity: 0.4; transform: scale(1); }
  `;

  return (
    // <Box>
    <Box sx={{backgroundColor: thema.palette.background.base}}>

      {/* 학습방법 설명 박스 */}
      <Box sx={{py:3}}>
        <StocksDetailInfoTooltipIcon text={"아이콘에 마우스를 올리면 쉬운 설명을 볼 수 있어요!"} />
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
            <Typography variant="h5" fontWeight={600} >
              {detailStock?.basicHead?.stockName ?? "종목명 "}{loading && "로딩중..."}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              국내   
            </Typography>                    
            <Typography variant="body1" color="text.secondary">
              { detailStock?.basicHead?.code ?? "종목코드 "}{loading && "로딩중..."}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              { detailStock?.basicHead?.marketName ?? "코스피/코스닥 정보 "}{loading && "로딩중..."}
            </Typography>          
          </Box>

          {/* 정보 카드 */}
          <Box
            sx={{              
              borderRadius: 2,
              //px: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Grid container sx={{ justifyContent: "space-between" }}>              
              {(detailStock.basic ?? Array(4).fill({
                  label: "항목",
                  value: "데이터",
                  tooltip: "설명"
                })
              ).map((item, index) => (
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
                    borderBottom: (theme) => `1px solid ${theme.palette.base.lightActive}`
                  }}
                >
                  <Typography sx={{ display: 'flex', alignItems: 'center'}}>{item.label}
                    <StocksDetailTooltip text={item.tooltip}>
                      <Box component="span" sx={{ color: (theme) => theme.palette.base.lightActive, display: 'flex', alignItems: 'center', px: 1 }}>
                        <InfoIcon/>            
                      </Box>
                    </StocksDetailTooltip>
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
              투자지표 {loading && "로딩중..."}
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", gap: 3, overflow: "hidden" }}>
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
              AI 분석
            </Typography>
          </Box>
          
          {/* 내용 카드 */}
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              {loadingAi && (
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center",
                  gap: 1,
                  mb: 1
                }}>
                  <AutoAwesomeIcon 
                    sx={{ 
                      color: "#3B5BDB",
                      animation: `${sparkle} 1.5s ease-in-out infinite`,
                    }} 
                  />
                  <Typography sx={{ fontSize: 14, color: "#3B5BDB", fontWeight: 600 }}>
                    AI 분석 중…
                  </Typography>
                </Box>
              )}
              <Typography variant="body1" sx={{ textAlign: "left", whiteSpace: "pre-line" }}>
                [요약]<br />
                {detailStockAi.summary}<br /><br />
                [투자 포인트]<br /> {detailStockAi.investmentPoint}<br /><br />
                [가격]<br /> {detailStockAi.price}<br /><br />
                [가치평가]<br /> {detailStockAi.valuation}<br /><br />
                [수급·거래]<br /> {detailStockAi.flow}<br /><br />
                [리스크·상태]<br /> {detailStockAi.risk}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* 추천 영상 */}       
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>          
        
          {/* 제목 */}
          <Box sx={{display: "flex"}}>
            <Typography variant="h5" fontWeight={600}>
              추천 영상 
            </Typography>
          </Box>

          {/* <Typography variant="body1" sx={{ textAlign: "left", whiteSpace: "pre-line" }}>              
                {detailStockAi.description}                
              </Typography> */}
          
          {/* 내용 카드 */}
          <Box sx={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px'}}>
            {detailStockYoutube.map((video) => (
              <Card
                key={video.id}
                sx={{ cursor: "pointer", border:1, borderColor:'line.main' }}
                onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank")}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                />
                <CardContent
                  sx={{ display: 'flex', flexDirection:'column', gap: 1,
                    "& .MuiTypography-root": { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}}>
                  <Typography sx={{fontSize:18, fontWeight:600}}>
                    {video.title}
                  </Typography>
                  <Typography sx={{color:'text.light'}}>
                    {video.channelTitle}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box> 

      </Box>
    </Box>
  );
}

function InfoCard({ title, rows }) {
  const safeRows = rows ?? Array(4).fill({ label: "항목", value: "데이터", tooltip:"설명" });  
  return (        
    <Box
      sx={{
        flex: 1,
        p: 2,
        background: (theme) => theme.palette.background.light,
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
      { safeRows.map((item, i) => (
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
              <StocksDetailTooltip text={item.tooltip}>
                <Box sx={{ color: (theme) => theme.palette.base.lightActive, display: 'flex', alignItems: 'center', px: 1 }}>
                  <InfoIcon/>            
                </Box>
              </StocksDetailTooltip>
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
          {i < safeRows.length - 1 && <Divider sx={{ borderColor: (theme) => theme.palette.base.lightActive }} />}
        </Box>
      ))}
    </Box>
  );
}

