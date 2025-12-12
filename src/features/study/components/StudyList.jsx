import { useNavigate } from "react-router-dom";

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
import { useStudyList } from "../hooks/useStudyList";
import { useWriteModal } from "../hooks/useWriteModal";
import FormModal from "../../../base/components/modal/FormModal";


/**
 * 학습 개념 목록
 * @since 2025-12-08
 * @author kcw
 */

export default function StudyList({ admin = false }) {

  // [1] 검색 요청 상태
  const {
    searchRq, searchRp, loading, // 상태
    handlePage, handleOrder // 상태관리 함수
  } = useStudyList({admin})

  const navigate = useNavigate()
  const { openWriteModal, writeProps } = useWriteModal({admin}) // 사용 모달 프롭스

  // [2] 필요 데이터 정의
  const rows = searchRp ? searchRp.data : []
  const pagination = searchRp ? searchRp.pagination : {}

  // 필터 옵션
  const sortOptions = [
    { value: "latest", label: "등록순" },
    { value: "levelAsc", label: "쉬운순" },
    { value: "levelDesc", label: "어려운순" },
  ]

  // [5] 반환 UI
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
            개념 학습 관리
          </Typography>
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
                학습 등록
              </Button>
            )}
          </Box>

          
          {/* 우측 정렬 바 */}
          <OrderBar options={sortOptions} selected={searchRq.order} onChange={handleOrder} />
        </Box>


        {/* 리스트 */}
        <TableContainer component={Paper} sx={{width: "100%", overflow: "auto", maxWidth: "1000px", mx: "auto", overflowY: "scroll"}}>
          <Table sx={{ tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ width: '10%' }}>No.</TableCell>
                <TableCell sx={{ width: '20%' }}>제목</TableCell>
                <TableCell sx={{ width: '40%', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>내용</TableCell>
                <TableCell align="center" sx={{ width: '10%' }}>레벨</TableCell>
                <TableCell align="center" sx={{ width: '20%' }}>비고</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 15 }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 15 }}>
                    등록한 단계 학습이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, index) => (
                  <TableRow
                    key={row.studyId}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/admin/studies/${row.studyId}`)}
                  >
                    <TableCell align="center">{row.studyId}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.summary}</TableCell>
                    <TableCell align="center">{row.level}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={(e) => {
                        e.stopPropagation()
                        alert("ok")
                      }}
                      >
                        <EditIcon sx={{mr: 1}} />
                        <DeleteIcon />
                      </IconButton>
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
    </Box>
  )
}