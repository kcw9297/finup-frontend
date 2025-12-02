import { 
  Box, 
  Typography, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
} from '@mui/material'
import { useReboardSearch } from "../hooks/useReboardSearch"
import PageBar from "../../../base/components/bar/PageBar"
import SearchBar from "../../../base/components/bar/SearchBar"

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
      < SearchBar searchRq={searchRq} onSubmit={handleSearch} onChange={updateSearchRq} filterOnChange={handleFilter} />

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