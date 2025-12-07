import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Paper, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function GoodVideo ({ videoList }) {

  // 페이지 상태 + 계산 (4개씩 보여주기)
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const maxPage = Math.ceil(videoList.length / itemsPerPage) - 1;

  const start = page * itemsPerPage;
  const visibleVideos = videoList.slice(start, start + itemsPerPage);

  // 버튼 활성 조건
  const isPrevDisabled = page === 0;
  const isNextDisabled = page === maxPage;

  const handlePrev = () => {
    if (isPrevDisabled) return;
    setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (isNextDisabled) return;
    setPage((prev) => prev + 1);
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

      <Box 
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",
        "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }}}>

        {/* 제목 */}
        <Paper sx={{ display: 'flex', gap: '10px', alignItems: 'center', paddingRight: 1 }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>핵심 키워드</Typography>
        </Paper>

        {/* < > 버튼 */}
        <Box>
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon sx={{ color: isPrevDisabled ? "text.light" : "text.main" }}/>
          </IconButton>

          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon sx={{ color: isNextDisabled ? "text.light" : "text.main" }}/>
          </IconButton>
        </Box>
      </Box>

      {/* 영상 리스트 */}
      <Box sx={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'20px'}}>
        {visibleVideos.map((video) => (
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
  );
}