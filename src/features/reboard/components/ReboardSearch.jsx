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
import PageBar from "../../../base/components/bar/PageBar"
import InputLabel from '@mui/material/InputLabel';

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
          sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}
        >
          <FormControl size="small" sx={{ minWidth: 120, }}>
            <InputLabel>필터</InputLabel>
            <Select
              value={searchRq.filter}
              onChange={e => handleFilter(e.target.value)}
              autoWidth
              label="필터"
              sx={{ minWidth: 100, height: 40, }}
            >
              <MenuItem value=""><em>선택</em></MenuItem>
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
            sx={{ width: 500 }}
          />

          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              minWidth: 40,
              width: 40,
              height: 40,
              borderRadius: 1,
              p: 0,
              boxShadow: 'none' // 그림자 제거
            }}
          >
            <SearchIcon />
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
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
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
      <PageBar pagination={pagination} onChange={handlePage}/>
    </Box>
  )
}