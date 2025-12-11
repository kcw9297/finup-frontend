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
import { SORT_OPTIONS } from "../constants/viedoLinkConstant";
import { useVideoLinkList } from "../hooks/useVideoLinkList";
import SearchBar from "../../../base/components/bar/SearchBar";


/**
 * 학습 영상 목록
 * @since 2025-12-10
 * @author kcw
 */

export default function VideoLinkList({ admin = false }) {

  // [1] 검색 요청 상태
  const {
    searchRq, searchRp, loading, searchProps, 
    handleKeyword, handleSearch, handleFilter, handlePage, handleOrder, 
    handleAfterEdit, handleAfterRemove
  } = useVideoLinkList({admin})

  // [2] 필요 데이터
  const rows = searchRq?.data ?? [] 
  const pagination = searchRp?.pagination ?? {}

  // [3] 반환 UI
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
            개념 단어 관리
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
          mb: 4,
          maxWidth: '980px',
          mx: 'auto'
        }}>

          {/* 좌측 버튼 (관리자용) */}
          <Box sx={{ width: "140px", height: "40px" }}>
            {admin && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                //onClick={openWordWriteModal}
                sx={{ 
                  bgcolor: 'base.main',
                  '&:hover': { bgcolor: 'base.dark' }
                }}
              >
                단어 등록
              </Button>
            )}
          </Box>
          
          {/* 우측 정렬 바           <OrderBar options={SORT_OPTIONS} selected={searchRq.order} onChange={handleOrder} /> */}

        </Box>

        {/* 이미지 카드 리스트 (4 * 4) */}
        {loading ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 350 }}>
              <CircularProgress size={24} sx={{ color: 'white' }} />
          </Box>
        ) : rows.length === 0 ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 350 }}>
            <Typography variant="body2" color="text.secondary">
              등록된 영상이 없습니다.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ maxWidth: '980px', mx: 'auto' }}>
            {rows.map((row) => (
              <Grid key={row.studyWordId}>
                <WordCard 
                  word={{ ...row, id: row.studyWordId }} 
                  admin={admin}
                  functions={{
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        {/* 페이징 바 <PageBar pagination={pagination} onChange={handlePage}/> */}
        <Box sx={{mt: 5}}>
          
        </Box>
      </Box>

        {/* 모달 영역 */}
    </Box>
  );
}