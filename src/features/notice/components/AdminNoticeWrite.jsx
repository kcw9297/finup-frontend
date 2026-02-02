import { useNavigate } from "react-router-dom";
import { useNoticeWrite } from "../hooks/useNoticeWrite";
import { IconButton, TextField, Button, Typography, Box, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * 공지사항 게시글 작성
 * @author khj
 * @since 2025-12-03
 */
export default function AdminNoticeWrite() {

  // [1] 폼 커스텀 훅
  const {
    form, changeForm,
    handleWrite
  } = useNoticeWrite()

  const navigate = useNavigate()

  // [2] 반환 컴포넌트 구성

  return (
    <Box sx={{ display: "flex", width: "100%", maxWidth: "800px", mx: "auto" }}>
      <Box sx={{ flexGrow: 1, padding: 4 }}>

        {/* 상단 뒤로가기 + 제목 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, mx: "auto" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, ml: 1 }}>
            공지사항 작성
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ padding: 4, borderRadius: 3, border: "1px solid", maxWidth: "750px", mx: "auto" }}>
          <TextField
            label="제목"
            fullWidth
            value={form.title}
            onChange={(e) => changeForm({ title: e.target.value })}
          />

          <Divider sx={{ my: 3 }} />

          <TextField
            label="내용"
            fullWidth
            multiline
            rows={8}
            value={form.content}
            onChange={(e) => changeForm({ content: e.target.value })}
          />
        </Paper>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="contained" onClick={handleWrite}>
            등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  )
}