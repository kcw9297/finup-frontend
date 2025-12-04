import { useNavigate, useParams } from "react-router-dom"
import { useNoticeDetail } from "../hooks/useNoticeDetail"
import { useNoticeRemove } from "../hooks/useNoticeRemove"
import { useEffect, useState } from "react"
import { IconButton, Button, Typography, Box, Paper, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ConfirmDialog from "./ConfirmDialog"
import theme from "../../../base/design/thema";
export default function NoticeDetail() {

  // [0] 공통 날짜 포맷 함수 (Summary와 동일)
  function formatDate(dateString) {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // [1] 필요한 상수들(URL 파라미터 외)
  const { noticeId } = useParams()
  const navigate = useNavigate()
  const { removeNotice } = useNoticeRemove()
  const [openConfirm, setOpenConfirm] = useState(false)


  // [2] 상세 조회 훅
  const {
    detailRq,
    detailRp,
    loading,
    changeDetailRq
  } = useNoticeDetail()


  // 페이지 진입 시 noticeId 설정 -> 조회
  useEffect(() => {
    changeDetailRq({ noticeId })
  }, [noticeId])

  // 로딩 또는 데이터 없음 처리
  if (loading) return <Typography sx={{ p: 4 }}>로딩중...</Typography>
  if (!detailRp) return <Typography sx={{ p: 4 }}>데이터가 없습니다.</Typography>

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* 좌측 관리자 메뉴 자리 */}
      {/* <AdminSidebar /> */}

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, p: 4 }}>
        {/* 상단 제목 + 뒤로가기 */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <IconButton size="large" onClick={() => navigate("/admin/notices")}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h5" sx={{ fontWeight: 600, ml: 1 }}>
            공지사항 상세
          </Typography>
        </Box>

        {/* 상세 내용 카드 */}
        <Paper elevation={0} sx={{ padding: 4, borderRadius: 3, maxWidth: "750px", mx: "auto", border: theme.palette.line.dark }}>
          <Typography variant="h4" fontWeight={700}>
            {detailRp.title}
          </Typography>

          <Typography variant="body2" color="gray" sx={{ mt: 1 }}>
            작성자: {detailRp.admin || "관리자"}
            <br />
            작성일자: {formatDate(detailRp.cdate)}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* 내용 */}
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line", lineHeight: 1.7 }}
          >
            {detailRp.content}
          </Typography>

        </Paper>
        {/* 버튼 정렬 박스 */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, gap: 1 }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/admin/notices/${noticeId}/edit`)}
          >
            수정하기
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpenConfirm(true)}
          >
            삭제하기
          </Button>
        </Box>

        {/* 삭제 확인 Dialog */}
        <ConfirmDialog
          open={openConfirm}
          title="공지사항 삭제"
          content="정말 삭제하시겠습니까?"
          onClose={() => setOpenConfirm(false)}
          onConfirm={() => {
            removeNotice(noticeId).then(() => {
              setOpenConfirm(false)
              navigate("/admin/notices")
            })
          }}
        />
      </Box>
    </Box>
  )
}