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
  CircularProgress
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useReboardSearch } from "../hooks/useReboardSearch"

export default function ReboardSearch() {

  // [1] 게시글 검색 커스텀 Hook
  const {
    searchRq, searchRp, loading, 
    setLoading, updateSearchRq, handleSearch, handlePage 
  } = useReboardSearch()

  // [2] 필요 데이터 정의
  const rows = searchRp ? searchRp.data : []
  const pagination = searchRp ? searchRp.pagination : {}

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
          onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
          sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
        >
          <FormControl sx={{ minWidth: 150 }}>
            <Select
              name="filter"
              value={searchRq.filter}
              onChange={e => updateSearchRq({ filter: e.target.value })}
              size="small"
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
          onClick={() => updateSearchRq({ order: 'latest' })}
          color={searchRq.order === 'latest' ? 'primary' : 'default'}
          variant={searchRq.order === 'latest' ? 'filled' : 'outlined'}
        />
        <Chip
          label="과거순"
          onClick={() => updateSearchRq({ order: 'oldest' })}
          color={searchRq.order === 'oldest' ? 'primary' : 'default'}
          variant={searchRq.order === 'oldest' ? 'filled' : 'outlined'}
        />
      </Box>

      {/* 게시글 목록 테이블 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>번호</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>이름</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>제목</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : !searchRp || searchRp.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8, color: 'text.secondary' }}>
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              rows.map(row => (
                <TableRow 
                  key={row.idx}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => console.log(`상세 페이지로 이동: ${row.idx}`)}
                >
                  <TableCell align="center">{row.idx}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.subject}</TableCell>
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