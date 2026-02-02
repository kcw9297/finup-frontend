import { 
  Box, Typography, Paper, Button, IconButton, 
  Card, CardMedia, CardContent, Chip
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import VideoCard from '../../../base/components/card/VideoCard';
import { useVideoLists } from '../hooks/useVideoLists';


/**
 * 단계 학습 영상 카드 묶음 컴포넌트
 * @author kcw
 * @since 2025-12-14
 */

export default function VideoLinks({ videos = [], admin = false }) {

  // 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(videos.length / 4));

  // 렌더링
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        {/* 말머리 + 우측 버튼 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

          {/* 말머리 */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: 'text.main',
              position: 'relative',
              pl: 2,
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 4,
                height: '100%',
                bgcolor: 'base.main',
                borderRadius: 1
              }
            }}
          >
            추천 개념 용어
          </Typography>

          {/* AI 추천 리로드 버튼 */}
          <Tooltip title="재추천">
            <IconButton
              size="small"
              sx={{
                border: '1px solid',
                borderColor: 'line.dark',
                borderRadius: 1,
                width: 32,
                height: 32
              }}
              onClick={() => {
                alert('재추천 기능')
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 페이지 네비게이션 버튼 */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            size="small"
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() => setCurrentPage(Math.min(pageCount - 1, currentPage + 1))}
            disabled={currentPage === pageCount - 1}
            size="small"
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* 단어 그리드 (4개씩) */}
      {/* 관리자가 아니고, 단어가 없으면 빈 메세지 */}
      {!admin && videos.length === 0 ? (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 350, maxHeight: 350 }}>
          <Typography variant="body2" color="text.secondary">
            추천된 영상이 없습니다.
          </Typography>
        </Box>
      ) : (

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>

          {/* 단어 카드들 */}
          {videos.slice(currentPage * 3, currentPage * 3 + 3).map((video) => (
            <VideoCard key={video.id} word={video} />
          ))}

        </Box>
      )}
    </>
  )
}