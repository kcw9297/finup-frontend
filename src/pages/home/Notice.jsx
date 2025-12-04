import { Paper, Box, Typography, IconButton } from "@mui/material"
import NotificationsIcon from '@mui/icons-material/Notifications'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'

export default function Notice({ noticeList, noticeCurrent, fade, showNext }) {
  
  // 공지사항
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
        component="a"
        href="#"
        style={{ textDecoration: "none" }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          cursor: 'pointer',
          "& .title": {
            fontSize: 16,
            fontWeight: 500,
            color: "text.primary",
          },
          "& .notice-text": {
            fontSize: 16,
            color: "text.secondary",
          },
        }}
      >
        <NotificationsIcon fontSize="small" />

        <Typography className="title">공지사항</Typography>
        <Typography className="title">|</Typography>

        <Typography
          className="notice-text"
          sx={{
            opacity: fade ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {noticeList[noticeCurrent]}
        </Typography>
      </Box>

      {/* 오른쪽 이동 버튼 */}
      <IconButton onClick={() => showNext(true)} sx={{ ml: 1 }}>
        <UnfoldMoreIcon />
      </IconButton>

    </Paper>
  )
}