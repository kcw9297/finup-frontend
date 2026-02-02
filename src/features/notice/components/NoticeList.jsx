import {
  Box, Paper, Table, TableHead,
  TableBody, TableRow, TableCell, Typography, IconButton, Tooltip, Grid,
  CircularProgress,
  TableContainer,
  Button
} from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete'
import OrderBar from "../../../base/components/bar/OrderBar";
import PageBar from "../../../base/components/bar/PageBar";
import FormModal from "../../../base/components/modal/FormModal";
import ConfirmModal from "../../../base/components/modal/ConfirmModal";
import { useNavigate } from "react-router-dom"
import { useNoticeList } from "../hooks/useNoticeList";
import { formatListDate, SORT_OPTIONS } from "../constants/noticeConstant";
import { useNoticeWriteModal } from "../hooks/useNoticeWriteModal";
import { useNoticeEditModal } from "../hooks/useNoticeEditModal";
import { useNoticeRemoveModal } from "../hooks/useNoticeRemoveModal";
import SearchBar from "../../../base/components/bar/SearchBar";

/**
 * 공지사항 게시글 리스트
 * @author kcw
 * @since 2025-12-15
 */
export default function NoticeList({ admin = false }) {

  // [1] 사용 Hook
  const {
    searchRq, searchRp, loading, searchProps,
    handlePage, handleOrder,
    handleAfterEdit, handleAfterRemove
  } = useNoticeList({admin})

  const navigate = useNavigate()

  // 사용 모달
  const { openWriteModal, writeProps } = useNoticeWriteModal({admin})
  const { openEditModal, editProps } = useNoticeEditModal({handleAfterEdit, admin})
  const { openRemoveModal, removeProps } = useNoticeRemoveModal({handleAfterRemove, admin})

  // 사용 데이터
  const rows = searchRp?.data ?? []
  const pagination = searchRp?.pagination ?? {}

 // 반환 UI
  return (
    <Box sx={{ display: "flex", width: "100%" }}>

      <Box sx={{ flexGrow: 1, padding: 4 }}>

        {/* 상단 타이틀 */}
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 3,
          maxWidth: "750px",
          mx: "auto"
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            공지사항 관리
          </Typography>
        </Box>

        {/* 검색 바 */}
        <Box sx={{p: 1}}>
          <SearchBar searchProps={searchProps} />
        </Box>

        {/* 정렬 바와 버튼 */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', // 양 끝 정렬
          alignItems: 'center', // 수직 중앙 정렬
          mb: 2,
          maxWidth: '980px',
          mx: 'auto'
        }}>

          {/* 좌측 버튼 (관리자용) */}
          <Box sx={{ width: "140px", height: "40px" }}>
            
            {admin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={openWriteModal}
                sx={{ 
                  bgcolor: 'base.main',
                  '&:hover': { bgcolor: 'base.dark' }
                }}
              >
                공지사항 등록
              </Button>
            )}
            
          </Box>
          
          {/* 우측 정렬 바 */}
          <OrderBar options={SORT_OPTIONS} selected={searchRq.order} onChange={handleOrder} />
        </Box>


        {/* 리스트 */}
        <TableContainer component={Paper} sx={{width: "100%", overflow: "auto", maxWidth: "1000px", mx: "auto", overflowY: "scroll"}}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '10%' }}>No.</TableCell>
                <TableCell sx={{ width: '50%', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>제목</TableCell>
                <TableCell align="center" sx={{ width: '15%' }}>작성일</TableCell>
                <TableCell align="center" sx={{ width: '15%' }}>조회수</TableCell>
                <TableCell align="center" sx={{ width: '10%' }}></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 15 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 15 }}>
                    등록한 공지사항이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.noticeId}
                    hover
                  >
                    <TableCell align="center">{row.noticeId}</TableCell>
                    <TableCell onClick={() => navigate(`/notices/detail/${row.noticeId}`)} sx={{ cursor: "pointer" }}>{row.title}</TableCell>
                    <TableCell align="center">{formatListDate(row.cdate)}</TableCell>
                    <TableCell align="center">{Number(row.viewCount).toLocaleString('ko-KR')}</TableCell>
                    <TableCell align="center">
                        {admin && ( // 관리자에게만 표시되는 버튼
                          <>
                            <EditIcon sx={{mr: 1, cursor: "pointer"}} onClick={() => openEditModal(row)} />
                            <DeleteIcon sx={{cursor: "pointer"}} onClick={() => openRemoveModal(row.noticeId)}/>
                          </>
                        )}
                    </TableCell>
                  </TableRow>
              ))
            )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* 하단 페이징 */}
        <PageBar pagination={pagination} onChange={handlePage}/>
      </Box>

        {/* 모달 영역 */}
        <FormModal modalProps={writeProps} />
        <FormModal modalProps={editProps} />
        <ConfirmModal modalProps={removeProps} />
    </Box>
  )

}
