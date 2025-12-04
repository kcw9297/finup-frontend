import { useNavigate } from "react-router-dom"
import { useNoticeRemove } from "../hooks/useNoticeRemove"
import {
  Box, IconButton, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Tooltip, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import PageBar from "../../../../base/components/bar/PageBar"
import AdminSidebar from "../../../../base/components/layout/AdminSidebar"
import DeleteIcon from '@mui/icons-material/Delete'
import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import SearchBar from "../../../../base/components/bar/SearchBar"
import { useNoticeList } from "../../../notice/hooks/useNoticeList";
export default function AdminNoticeList() {


  // [0] 날짜 포맷 함수
  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      /*
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
*/
    });
  }

  // [1] 목록, 삭제 커스텀 훅
  const {
    searchRq, changeSearchRq,
    noticeList, pagination,
    loading, fetchNoticeSummary
  } = useNoticeList()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [targetId, setTargetId] = useState(null)

  const { removeNotice } = useNoticeRemove()

  // [2] 페이징 계산
  const totalPages = (pagination && pagination.dataCount)
    ? Math.ceil(pagination.dataCount / pagination.pageSize)
    : 1;

  // console.log("pagination >>>", pagination)
  const navigate = useNavigate();

  // [3] 반환 컴포넌트 구성
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* 좌측 관리자 메뉴 */}
      <AdminSidebar />

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {/* 상단 타이틀 + 등록 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, maxWidth: "750px", mx: "auto" }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            공지사항 관리
          </Typography>

          <Tooltip title="공지사항 등록">
            <IconButton
              size="large"
              onClick={() => navigate("/admin/notices/write")}
            >
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Box>
        { /* 검색 바 */}
        <SearchBar
          searchRq={searchRq}
          onChange={(rq) => changeSearchRq(rq)}
          onSubmit={(e) => {
            // 이벤트 동작 방지
            e.preventDefault()
            // 검색 실행
            fetchNoticeSummary()
          }}
        />
        {/* 공지사항 테이블 */}
        <Paper elevation={0} sx={{ width: "100%", overflow: "hidden", maxWidth: "800px", mx: "auto" }}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 60 }}>No.</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>내용</TableCell>
                <TableCell sx={{ width: 140 }}>등록일자</TableCell>
                <TableCell sx={{ width: 70 }}>삭제</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {noticeList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                    공지사항이 없습니다.
                  </TableCell>
                </TableRow>
              )}

              {noticeList.map((n, index) => (
                <TableRow
                  key={n.noticeId}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigate(`/admin/notices/${n.noticeId}`)}
                >
                  <TableCell sx={{ width: 60 }}>{index + 1}</TableCell>
                  <TableCell>{n.title}</TableCell>
                  <TableCell sx={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {n.content}
                  </TableCell>
                  <TableCell sx={{ width: 140 }}>{formatDate(n.cdate)}</TableCell>
                  <TableCell sx={{ width: 70 }}><IconButton onClick={(e) => {
                    // 상세 페이지 이동 막기
                    e.stopPropagation()
                    setTargetId(n.noticeId)
                    setDialogOpen(true)
                  }}
                  >
                    <DeleteIcon />
                  </IconButton></TableCell>
                </TableRow>
              ))}

            </TableBody>

            {/* 삭제 확인 Dialog*/}
            <ConfirmDialog
              open={dialogOpen}
              title="공지사항 삭제"
              content="정말로 이 공지사항을 삭제하시겠습니까?"
              onClose={() => setDialogOpen(false)}
              onConfirm={() => {
                removeNotice(targetId).then(() => {
                  fetchNoticeSummary()
                  setDialogOpen(false)
                })
              }}
            />
          </Table>
        </Paper>
        {/* 페이지네이션 */}
        {pagination && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <PageBar
              pagination={pagination}
              page={pagination.pageNum + 1}
              count={totalPages}
              onChange={(value) => {
                changeSearchRq({ pageNum: value })
              }}
            />
          </Box>
        )}

      </Box>
    </Box>
  )
}
