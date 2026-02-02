import { useState } from "react";
import { Box, Card, CardMedia, CardContent, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useHomeVideoList } from "../../videolink/hooks/useHomeVideoList";
import HomeVideoCard from "./HomeVideoCard";
import { useLoginMember } from "../../../base/hooks/useLoginMember";

export default function RecommendedVideo() {

  const { videoList = [], loading, retryRecommendation } = useHomeVideoList({
    size: 20
  })

  const { isAuthenticated } = useLoginMember()

  // 페이지 상태 + 계산 (4개씩 보여주기)
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;

  const maxPage = Math.max(
    Math.ceil(videoList.length / itemsPerPage) - 1,
    0
  )
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
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

      <Box
        sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.6,
          "& .MuiTypography-root": { fontSize: 22, fontWeight: 600 }
        }}
      >

        {/* 제목 */}
        <Paper sx={{ display: 'flex', gap: '10px', alignItems: 'center', paddingRight: 1 }}>
          <Typography sx={{ color: 'base.main', backgroundColor: 'base.main' }}>&nbsp;</Typography>
          <Typography>추천 영상</Typography>

          {isAuthenticated &&
            <Tooltip title="재추천">
              <IconButton
                size="small"
                disabled={loading}
                sx={{
                  border: '1px solid',
                  borderColor: 'line.dark',
                  borderRadius: 1,
                  width: 32,
                  height: 32
                }}
                onClick={() => {
                  setPage(0)
                  retryRecommendation()
                }}
              >
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
          
        </Paper>

        {/* < > 버튼 */}
        <Box>
          <IconButton
            onClick={handlePrev}
            sx={{ cursor: isPrevDisabled ? 'default' : 'pointer', pointerEvents: isPrevDisabled ? 'none' : 'auto' }}
          >
            <ArrowBackIosNewIcon sx={{ color: isPrevDisabled ? 'text.light' : 'text.main' }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{ cursor: isNextDisabled ? "default" : "pointer", pointerEvents: isNextDisabled ? "none" : "auto" }}
          >
            <ArrowForwardIosIcon sx={{ color: isNextDisabled ? 'text.light' : 'text.main' }} />
          </IconButton>
        </Box>
      </Box>
      {/* 내용 영역만 분기 */}
      {!loading && !videoList.length && (
        <Box sx={{ py: 6, textAlign: 'center', color: 'text.light' }}>
          추천 영상이 없습니다.
        </Box>
      )}

      {/* 영상 리스트 */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {visibleVideos.map((video) => (
          <HomeVideoCard key={video.videoLinkId} video={video} />
        ))}
      </Box>
    </Box>
  );


}
/*<Card
            key={video.id}
            sx={{
              cursor: 'pointer', border: 1, borderColor: 'line.main',
              "&:hover": { backgroundColor: 'background.light' },
            }}
            onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank")}
          >
            <CardMedia
              component="img"
              height="180"
              image={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
            />
            <CardContent
              sx={{
                display: 'flex', flexDirection: 'column', gap: 1,
                "& .MuiTypography-root": { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                {video.title}
              </Typography>
              <Typography sx={{ color: 'text.light' }}>
                {video.channelTitle}
              </Typography>
            </CardContent>
          </Card>*/