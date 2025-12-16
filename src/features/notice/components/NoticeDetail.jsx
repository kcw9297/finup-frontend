import { useNavigate } from "react-router-dom"
import { useNoticeDetail } from "../hooks/useNoticeDetail"
import { Button, Typography, Box, Paper, Divider, Chip } from "@mui/material"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import VisibilityIcon from '@mui/icons-material/Visibility'
import PersonIcon from '@mui/icons-material/Person'
import theme from "../../../base/design/thema"
import { formatDetailDate } from "../constants/noticeConstant"
/**
 * 공지사항 게시글 상세 정보
 * @author kcw
 * @since 2025-12-15
 */
export default function NoticeDetail({ admin = false }) {

  // [1] 사용 Hook
  const { noticeId, detailRp, loading } = useNoticeDetail({admin})
  const navigate = useNavigate()

  // 사용 데이터
  const detail = detailRp?.data ?? {}

  // [2] 컴포넌트 반환
  return (
    <Box sx={{ 
      minHeight: '100vh',
      py: 6,
      px: { xs: 2, sm: 4 }
    }}>
      
      {/* 최대 너비 컨테이너 */}
      <Box sx={{ maxWidth: '1200px', mx: 'auto', pt: 5, pb: 5, bgcolor: 'background.light' }}>
        <Box sx={{ maxWidth: '1000px', mx: 'auto'  }}>
        
          {/* 헤더 영역 */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              fontWeight={700}
              sx={{ 
                color: '#1a1a1a',
                mb: 3,
                fontSize: { xs: '1.75rem', sm: '2.125rem' }
              }}
            >
              {detail.title}
            </Typography>

            {/* 메타 정보 */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center'
            }}>
              <Chip 
                icon={<PersonIcon sx={{ fontSize: 18 }} />}
                label="관리자"
                size="medium"
                sx={{ 
                  bgcolor: 'white',
                  border: '1px solid #e0e0e0',
                  fontWeight: 500,
                  p: 1
                }}
              />
              <Chip 
                icon={<CalendarTodayIcon sx={{ fontSize: 18 }} />}
                label={formatDetailDate(detail.cdate)}
                size="medium"
                sx={{ 
                  bgcolor: 'white',
                  border: '1px solid #e0e0e0',
                  fontWeight: 500,
                  p: 1
                }}
              />
              <Chip 
                icon={<VisibilityIcon sx={{ fontSize: 18 }} />}
                label={`조회수 ${Number(detail.viewCount || 0).toLocaleString('ko-KR')}`}
                size="medium"
                sx={{ 
                  bgcolor: 'white',
                  border: '1px solid #e0e0e0',
                  fontWeight: 500,
                  p: 1
                }}
              />
            </Box>
          </Box>

          {/* 내용 영역 */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 4,
              bgcolor: 'white',
              borderRadius: 2,
              border: '1px solid #e0e0e0',
              minHeight: 400,
              mb: 4
            }}
          >
            <Typography
              variant="body1"
              sx={{ 
                whiteSpace: 'pre-line',
                lineHeight: 2,
                color: '#333',
                fontSize: '1rem',
                wordBreak: 'break-word'
              }}
            >
              {detail.content || '내용이 없습니다.'}
            </Typography>
          </Paper>

          {/* 하단 버튼 */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              //gap: 2,
              mt: 5
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(-1)}
              sx={{
                minWidth: 150,
                bgcolor: 'base.main',
                '&:hover': {
                  bgcolor: 'base.dark'
                }
              }}
            >
              목록으로
            </Button>
          </Box>

        </Box>
      </Box>

    </Box>
  )
}