import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import thema from "../../../base/design/thema.js"
import { Box, Grid, Typography, Stack, Divider, Card, CardContent, CardMedia, keyframes, Chip, Skeleton, Tooltip, IconButton, CircularProgress } from "@mui/material";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StocksDetailInfoTooltipIcon from "./StocksDetailInfoTooltipIcon";
import InfoIcon from "@mui/icons-material/Info"; // i 아이콘
import StocksDetailTooltip from "./StocksDetailTooptip.jsx";
import {useRecommendedVideo} from "../../home/hooks/useRecommendedVideo.js"
import { useStockDetailStockAi } from "../hooks/useStocksDetailStockAi.js";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useStockDetailRecommendVideo } from "../hooks/useStockDetailRecommendVideo.js";


export default function StocksDetailStock({ stockDetail }){

  const { code } = useParams();
  const { detailStockAi, loadingAi, retryAnalyze } = useStockDetailStockAi(code);
  const { videos, loadingVideo, retryRecommend } = useStockDetailRecommendVideo(code);

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
              {stockDetail?.basicHead?.stockName || "종목명 "}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              국내   
            </Typography>                    
            <Typography variant="body1" color="text.secondary">
              { stockDetail?.basicHead?.code ?? "종목코드 "}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              { stockDetail?.basicHead?.marketName ?? "코스피/코스닥 정보 "}
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
              {(stockDetail?.basic ?? Array(4).fill({
                  label: "항목",
                  value: "데이터",
                  tooltip: "설명"
                })
              ).map((item) => (
                <Grid            
                  key={item.label}
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
              투자지표
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", gap: 3, overflow: "hidden" }}>
            <InfoCard title="가격" rows={ stockDetail?.price } />
            <InfoCard title="가치평가" rows={ stockDetail?.valuation } />
            <InfoCard title="수급·거래" rows={ stockDetail?.flow } />
            <InfoCard title="리스크·상태" rows={ stockDetail?.risk } />
          </Box>
        </Box>

        {/* AI분석 */}
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3}}>
      
          {/* 제목 */}
          <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
            <Typography variant="h5" fontWeight={600}>
              AI 분석
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
                    retryAnalyze()
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
          
          {/* 내용 카드 */}
          <Card variant="outlined" sx={{ border: 0, }}>
            <CardContent sx={{ padding: 0, margin: 0 }}>
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
                  <Typography sx={{ margin:2, fontSize: 14, color: "#3B5BDB", fontWeight: 600 }}>
                    AI 분석 중…
                  </Typography>
                </Box>
              )}
              
              {/* AI 해설 영역 */}
              <Box
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '100px 1fr', 
                  rowGap: 2, 
                  columnGap: 2,
                  alignItems: 'center',
                  "& .MuiChip-root": { justifySelf: 'start', width: '90px' },
                  "& .MuiTypography-root": { fontSize: 15, lineHeight: 1.6 }
                }}
              >
                {loadingAi ? (
                  <>
                    {/* 스켈레톤 6개 영역 */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <React.Fragment key={item}>
                        <Skeleton variant="rounded" width={100} height={32} />
                        <Skeleton variant="text" sx={{ fontSize: 15 }} />
                      </React.Fragment>
                    ))}
                  </>
                ) : detailStockAi ? (
                  <>
                    {/* 종합 요약 */}
                    <Chip label="종합 요약" color="secondary" variant="outlined" />
                    <Typography>{detailStockAi.summary}</Typography>

                    {/* 투자 포인트 */}
                    <Chip label="투자 포인트" color="primary" variant="outlined" />
                    <Typography>{detailStockAi.investmentPoint}</Typography>

                    {/* 가격 */}
                    <Chip label="가격" color="success" variant="outlined" />
                    <Typography>{detailStockAi.price}</Typography>

                    {/* 가치평가 */}
                    <Chip label="가치평가" color="info" variant="outlined" />
                    <Typography>{detailStockAi.valuation}</Typography>

                    {/* 수급·거래 */}
                    <Chip label="수급·거래" color="warning" variant="outlined" />
                    <Typography>{detailStockAi.flow}</Typography>

                    {/* 리스크·상태 */}
                    <Chip label="리스크·상태" color="error" variant="outlined" />
                    <Typography>{detailStockAi.risk}</Typography>
                  </>
                ) : (
                  <Typography sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 3 }}>
                    분석된 내용이 없습니다.
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* 추천 영상 */}       
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>          

          {/* 제목 */}
          <Box sx={{display: "flex", alignItems: "center", gap: 2}}>
            <Typography variant="h5" fontWeight={600}>
              추천 영상 
            </Typography>

            <Tooltip title="재추천">
              <span>
                <IconButton
                  size="small"
                  disabled={loadingVideo}
                  sx={{
                    border: '1px solid',
                    borderColor: 'line.dark',
                    borderRadius: 1,
                    width: 32,
                    height: 32
                  }}
                  onClick={() => {
                    retryRecommend()
                  }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
          
          {/* 내용 카드 */}
          <Box sx={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loadingVideo ? (
              <CircularProgress />
            ) : videos && videos.length > 0 ? (
              <Box sx={{width: '100%', display: 'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px', overflowX: 'auto' }}>
                {videos.map((video) => (
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
            ) : (
              <Typography>추천된 영상이 없습니다.</Typography>
            )}
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
        <Typography fontSize={16} fontWeight={400} color="text.light">
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
            <Typography fontSize={16} textAlign="right">
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

