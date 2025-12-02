import { useNavigate } from "react-router-dom";
import { useNoticeList } from "../hooks/useNoticeList";
import {
  Box, IconButton, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Tooltip, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function NoticeList() {

  // [1] 목록 커스텀 훅
  const {
    searchRq, changeSearchRq,
    noticeList, pagination,
    loading,
  } = useNoticeList()

  const navigate = useNavigate();

  // [2] 반환 컴포넌트 구성
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      {/* 좌측 관리자 메뉴 */}
      {/* <AdminSidebar/> */}

      {/* 우측 콘텐츠 영역 */}
      <Box sx={{ flexGrow: 1, padding: 4 }}>
        {/* 상단 타이틀 + 등록 버튼 */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography>
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

        {/* 공지사항 테이블 */}
        <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#fafafa" }}>
                <TableCell>No.</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>내용</TableCell>
                <TableCell>등록일자</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {noticeList.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{n.title}</TableCell>
                  <TableCell sx={{ maxWidth: 300, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {n.content}
                  </TableCell>
                  <TableCell>{n.cdate}</TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </Paper>
        {/* 페이지네이션 */}
        {pagination && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Pagination
              page={pagination.page}
              totalPage={pagination.totalPage}
              onChange={(newPage) => changeSearchRq({ page: newPage })}
            />
          </Box>
        )}


      </Box>
    </Box>
  )
}