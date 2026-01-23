import { Paper, Box, Typography, IconButton, CircularProgress, Skeleton } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useNavigate } from "react-router-dom";

// 공지사항

export default function Notice({ noticeList, noticeCurrent, fade, showNext, loading }) {

  // 아직 렌더링되지 않은 경우 빈 객체
  const currentNotice = noticeList[noticeCurrent] || {}

  const navigate = useNavigate()

  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: '10px 20px',
        border: 1,
        borderColor: 'line.main',
        borderRadius: 3,
      }}
    >

      {/* 왼쪽: 공지사항 텍스트 그룹 */}
      <Box
        
        style={{ textDecoration: "none" }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          
          "& .title": {
            fontSize: 16,
            fontWeight: 500,
          },
          "& .notice-text": {
            fontSize: 16,
          },
        }}
      >
        <NotificationsIcon fontSize="small" />

        <Typography className="title">공지사항</Typography>
        <Typography className="title">|</Typography>
        <Box
          onClick={() => navigate(`/notices/detail/${currentNotice.noticeId}`)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            mx: 2
          }}
        >
        {loading ? (
          <Skeleton variant="text" height={24} width={500} />
        ) : (
          <Typography
            className="notice-text"
            sx={{
              opacity: fade ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            {currentNotice.title}
          </Typography>
        )}
        </Box>
      </Box>

      {/* 오른쪽 이동 버튼 */}
      <IconButton onClick={() => showNext(true)} sx={{ ml: 1 }}>
        <UnfoldMoreIcon />
      </IconButton>

    </Paper>
  )
}