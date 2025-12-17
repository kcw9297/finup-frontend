import {
  Box, Typography, Paper, Button, IconButton,
  Tooltip,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import WordCard from '../../../base/components/card/WordCard';
import { useRecommendVideoLinkHook } from '../hooks/useRecommendVideoLinkHook';
import VideoCard from '../../../base/components/card/VideoCard';


/**
 * 단계 학습 단어 카드 묶음 컴포넌트
 * @author kcw
 * @since 2025-12-09
 */

export default function StudyVideos({ admin = false }) {

  // [1] 페이지 상태
  const [currentPage, setCurrentPage] = useState(0);


  // [2] 추천 영상 훅
  const { recommendRp, recommend, retryRecommend, loading, } = useRecommendVideoLinkHook()

  const pageSize = 4
  const pageCount = Math.max(1, Math.ceil((recommendRp?.length ?? 0) / pageSize))

  // [3] 최초 진입 시 추천 호출
  useEffect(() => {
    recommend()
  }, [])

  return (
    <>
      {/* ===== 헤더 영역 (항상 표시) ===== */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
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
            추천 개념 영상
          </Typography>

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
                setCurrentPage(0)
                retryRecommend()
              }}
            >
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            size="small"
            disabled={currentPage === 0 || loading}
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          >
            <ArrowBackIosIcon fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            disabled={currentPage === pageCount - 1 || loading}
            onClick={() => setCurrentPage(p => Math.min(pageCount - 1, p + 1))}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* ===== 콘텐츠 영역 (상태별 분기) ===== */}
      <Box sx={{ minHeight: 350 }}>

        {loading && (
          <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              추천 영상을 불러오는 중입니다...
            </Typography>
          </Box>
        )}

        {!loading && recommendRp?.length === 0 && (
          <Box sx={{ height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              추천된 영상이 없습니다.
            </Typography>
          </Box>
        )}

        {!loading && recommendRp?.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2
            }}
          >
            {recommendRp
              .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
              .map(video => (
                <VideoCard key={video.videoLinkId} video={video} />
              ))}
          </Box>
        )}
      </Box>
    </>
  )

}