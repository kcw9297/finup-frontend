import { useNavigate, useParams } from "react-router-dom";
import { useNoticeDetail } from "../../../notice/hooks/useNoticeDetail";
import { useEffect } from "react";
import { IconButton, TextField, Button, Typography, Box, Paper, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNoticeEdit } from "../hooks/useNoticeEdit";

/**
 * 공지사항 게시글 편집
 * @author khj
 * @since 2025-12-03
 */
export default function AdminNoticeEdit() {
  const { noticeId } = useParams()
  const navigate = useNavigate()

  // 상세 조회 훅
  const { detailRp, changeDetailRq, loading } = useNoticeDetail()

  // 수정 훅 (폼 상태 + submit까지 포함)
  const { form, changeEditRq, submit } = useNoticeEdit(noticeId, detailRp)

  // 상세 데이터 로드
  useEffect(() => {
    changeDetailRq({ noticeId })
  }, [noticeId])

  if (loading) return <Typography sx={{ p: 4 }}>로딩중...</Typography>;
  if (!detailRp) return <Typography sx={{ p: 4 }}>데이터가 없습니다.</Typography>;

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ flexGrow: 1, padding: 4 }}>

        {/* 상단 뒤로가기 + 제목 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 600, ml: 1 }}>
            공지사항 수정
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 4, borderRadius: 3, border: "1px solid" }}>

          <TextField
            label="제목"
            fullWidth
            value={form.title}
            onChange={(e) => changeEditRq("title", e.target.value)}
          />

          <Divider sx={{ my: 3 }} />

          <TextField
            label="내용"
            fullWidth
            multiline
            minRows={10}
            value={form.content}
            onChange={(e) => changeEditRq("content", e.target.value)}
          />

        </Paper>

        {/* 버튼 박스 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button variant="contained" onClick={submit}>
            저장하기
          </Button>
        </Box>

      </Box>
    </Box>
  );
}