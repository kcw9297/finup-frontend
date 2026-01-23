import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useWordSearch } from '../hooks/useWordSearch';
import OrderBar from '../../../base/components/bar/OrderBar';
import { useState } from 'react';
import PageBar from '../../../base/components/bar/PageBar';
import { useNavigate } from 'react-router-dom';


/**
 * 단어장 검색 컴포넌트
 * @author kcw
 * @since 2025-12-11
 */

export default function WordSearch() {


  const { searchRq,
    wordList,
    pagination,
    loading,
    handleChangeRq,
    handleSearch,
    handlePage,
    handleSearchEnter,
    handleOrderChange,

    recent,
    fetchRecent,

  } = useWordSearch()

  /// 최근 검색어 - 컴포넌트 표현 로직

  const [openRecent, setOpenRecent] = useState(false)

  const navigate = useNavigate()

  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 3 }}>
      
      {/* =================== 메인 테이블 =================== */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #CED4E4',
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '80px 300px 1fr',
            alignItems: 'center',
            px: 3,
            py: 1.4,
          }}
        >
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            No
          </Typography>

          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            용어
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ fontWeight: 600, fontSize: 14 }}
          >
            설명
          </Typography>

        </Box>

        {/* 행들 */}

        {!loading && wordList.length === 0 && (
          <Box sx={{ py: 8, textAlign: 'center', gridColumn: '1 / -1', }}>
            <Typography variant="body2" color="text.secondary">
              검색 결과가 없습니다.
            </Typography>
          </Box>
        )}

        {wordList.map((row, idx) => (
          <Box
            key={row.termId}  // termId를 key로 사용
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 300px 1fr',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              minHeight: 72,
              borderTop: idx === 0 ? '1px solid #CED4E4' : '1px solid #E3E7F2',
              bgcolor: '#FFFFFF',
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#F6F8FF',
              },
            }}
            onClick={() => navigate(`/words/detail/${row.termId}`)}
          >

            {/* No */}
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: 13 }}
            >
              {(pagination?.pageNum - 1) * pagination?.pageSize + idx + 1 || idx + 1}
            </Typography>

            {/* 용어 */}
            <Typography
              variant="body2"
              align="center"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                px: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {row.name}
            </Typography>

            {/* 설명 */}
            <Typography
              variant="body2"
              sx={{
                fontSize: 13,
                lineHeight: 1.6,
                px: 1.5,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {row.description}
            </Typography>

          </Box>
        ))}
      </Paper>
    </Box>

  )
}