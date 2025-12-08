import { Box, Paper, TextField, Typography, IconButton, Button } from "@mui/material";
import { useYoutubeVideoWrite } from "../hooks/useYoutubeVideoWrite";
import AdminSidebar from "../../../../base/components/layout/AdminSidebar"
import theme from "../../../../base/design/thema";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * 유튜브 영상 등록 컴포넌트
 * @since 2025-12-10
 * @author khj
 */

export default function YoutubeVideoWrite() {
  // [1] 훅 불러오기
  const {
    youtubeWriteRq,
    changeYoutubeWriteRq,
    handleYoutubeRegister
  } = useYoutubeVideoWrite()

  const navigate = useNavigate();

  // 미리보기 기능
  const previewVideo = () => {
    const url = youtubeWriteRq.url
    if (!url || !url.includes("youtube")) {
      alert("유효한 유튜브 영상 링크가 아닙니다")
      return
    }
    window.open(url, "_blank")
  }


  // [2] UI 반환
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      {/* 좌측 관리자 메뉴 */}
      <AdminSidebar />

      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "900px",
          mx: "auto",
          p: 4,
          backgroundColor: theme.palette.base.light
        }}
      >
        {/* 제목, 뒤로가기 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mx: "auto" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            유튜브 영상 등록(링크)
          </Typography>
        </Box>

        {/* 영상 링크 */}
        <TextField
          fullWidth
          label="영상 등록 링크"
          name="url"
          placeholder="https://www.youtube.com/..."
          value={youtubeWriteRq.videoUrl}
          onChange={(e) =>
            changeYoutubeWriteRq({ [e.target.name]: e.target.value })
          }
          autoComplete="off"
          sx={{ mb: 3 }}
        />

        {/* 제목 */}
        <TextField
          fullWidth
          label="제목"
          name="title"
          value={youtubeWriteRq.title}
          onChange={(e) =>
            changeYoutubeWriteRq({ [e.target.name]: e.target.value })
          }
          autoComplete="off"
          sx={{ mb: 3 }}
        />

        {/* 내용 */}
        <TextField
          fullWidth
          label="내용"
          name="content"
          multiline
          rows={10}
          value={youtubeWriteRq.content}
          onChange={(e) =>
            changeYoutubeWriteRq({ [e.target.name]: e.target.value })
          }
          autoComplete="off"
          sx={{ mb: 4 }}
        />

        {/* 버튼 영역 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 4,
          }}
        >
          {/* 좌측 취소 버튼 */}
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => window.history.back()}
          >
            취소
          </Button>

          {/* 우측 버튼 그룹 */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="info"
              onClick={previewVideo}
            >
              영상 미리보기
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={handleYoutubeRegister}
            >
              등록하기
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}