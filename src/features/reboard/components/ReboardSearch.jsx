import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from 'react'
import { 
  Box, 
  Typography, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  Skeleton
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useReboardSearch } from "../hooks/useReboardSearch"
import Loading from '../../../base/components/layout/Loading'

export default function ReboardSearch() {

  // [1] 게시글 검색 커스텀 Hook
  const {
    searchRq, searchRp, loading, 
    updateSearchRq, handleSearch, handleFilter, handlePage, handleOrder
  } = useReboardSearch()

  // [2] 필요 데이터 정의
  const rows = searchRp ? searchRp.data : []
  const pagination = searchRp ? searchRp.pagination : {}

  // 아직 요청 데이터가 로드되지 않은 경우, 로딩 처리
  //if (!searchRp) return (<Loading />)



  return (
    <Box>
      {/* 상단 타이틀 */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        게시판 목록
      </Typography>

      {/* 검색 바 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box 
          component="form" 
          onSubmit={(e) => { handleSearch(e); }}
          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              name="filter"
              value={searchRq.filter}
              onChange={e => handleFilter(e.target.value)}
              size="small"
              displayEmpty
            >
              <MenuItem value="">선택</MenuItem>
              <MenuItem value="name">이름</MenuItem>
              <MenuItem value="subject">제목</MenuItem>
              <MenuItem value="content">내용</MenuItem>
              <MenuItem value="subjectContent">제목+내용</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="keyword"
            placeholder="검색어 입력"
            value={searchRq.keyword}
            onChange={e => updateSearchRq({ keyword: e.target.value })}
            size="small"
            sx={{ flex: 1 }}
          />

          <Button 
            type="submit" 
            variant="contained" 
            startIcon={<SearchIcon />}
            sx={{ px: 3 }}
          >
            검색
          </Button>
        </Box>
      </Paper>

      {/* 정렬 바 */}
      <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
        <Chip
          label="최신순"
          onClick={() => handleOrder('latest')}
          color="base"
          variant={searchRq.order === 'latest' ? 'filled' : 'outlined'} // 초기 선택 값
        />
        <Chip
          label="과거순"
          onClick={() => handleOrder('oldest')}
          color="base"
          variant={searchRq.order === 'oldest' ? 'filled' : 'outlined'}
        />
      </Box>

      {/* 게시글 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold', width: '10%' }}>번호</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>이름</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', width: '50%' }}>제목</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold', width: '20%' }}>날짜</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              Array.from({ length: searchRq.pageSize }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    <Skeleton width="100%" />
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    <Skeleton width="100%" />
                  </TableCell>
                  <TableCell align="left" sx={{ width: '50%' }}>
                    <Skeleton width="100%" />
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    <Skeleton width="100%" />
                  </TableCell>
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <TableRow key={row.idx} hover sx={{ cursor: 'pointer' }}>
                  <TableCell align="center">{row.idx}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="left">{row.subject}</TableCell>
                  <TableCell align="center">{row.regdate}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* 하단 페이징 */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={10} // 총 페이지 수 (실제로는 searchRp에서 받아온 totalPages 사용)
          page={pagination.page || 1}
          onChange={(event, pageNum) => {
            console.log('페이지 번호:', pageNum);
            handlePage(pageNum);
          }}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  )
}