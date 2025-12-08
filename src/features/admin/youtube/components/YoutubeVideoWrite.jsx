import { Box, Paper, TextField, Typography, IconButton, Button } from "@mui/material";
import { useYoutubeVideoWrite } from "../hooks/useYoutubeVideoWrite";
import AdminSidebar from "../../../../base/components/layout/AdminSidebar"
import theme from "../../../../base/design/thema";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useYoutubePreview } from "../hooks/useYoutubePreview";
import { useEffect } from "react";

/**
 * 유튜브 영상 등록 컴포넌트
 * @since 2025-12-10
 * @author khj
 */

export default function YoutubeVideoWrite() {
  // [1] 훅 불러오기
  const {
    previewRq, previewRp, loading,
    changePreviewRq,
    loadPreview,
  } = useYoutubePreview()

  const {
    youtubeWriteRq,
    changeYoutubeWriteRq,
    handleYoutubeRegister
  } = useYoutubeVideoWrite()

  const navigate = useNavigate();


  // preview, write 연결(미리보기 기능)
  useEffect(() => {
    if (previewRp) {
      changeYoutubeWriteRq({
        videoUrl: previewRq.videoUrl,
        title: previewRp.title ?? "",
        content: previewRp.description ?? "",
        thumbnailUrl: previewRp.thumbnailUrl ?? "",
      })
    }
  }, [previewRp])

  // [3] UI 반환
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
        {/* URL + 확인 버튼 */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          {/* 영상 링크 */}
          <TextField
            fullWidth
            label="영상 등록 링크"
            name="videoUrl"
            placeholder="https://www.youtube.com/..."
            value={previewRq.videoUrl}
            onChange={(e) => {
              changePreviewRq({ videoUrl: e.target.value });
              changeYoutubeWriteRq({ videoUrl: e.target.value }); // ← 추가
            }}
            autoComplete="off"
          />

          <Button variant="contained" onClick={loadPreview} sx={{ whiteSpace: "nowrap" }}>
            확인
          </Button>
        </Box>

        {/* 미리보기 패널 */}
        {previewRp && (
          <Paper
            elevation={1}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              영상 정보 미리보기
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              제목: {previewRp.title}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              설명: {previewRp.description}
            </Typography>

            {previewRp.thumbnailUrl && (
              <Box
                component="img"
                src={previewRp.thumbnailUrl}
                sx={{
                  width: 240,
                  height: "auto",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                }}
              />
            )}
          </Paper>
        )}

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