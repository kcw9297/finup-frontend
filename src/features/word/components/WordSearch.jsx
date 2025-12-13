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
import theme from '../../../base/design/thema';
import SearchBar from '../../../base/components/bar/SearchBar';
import OrderBar from '../../../base/components/bar/OrderBar';
import { useState } from 'react';
import PageBar from '../../../base/components/bar/PageBar';


const ORDER_OPTIONS = [
  { value: 'name_asc', label: '가나다순' },
  { value: 'name_desc', label: '가나다 역순' },
];


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


  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 3 }}>
      {/* ================== SearchBar ================== */}
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          mt: 4,
          mb: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 780,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
          onKeyUp={(e) => handleSearchEnter(e)}
        >
          <TextField
            value={searchRq.keyword}
            fullWidth
            size="small"
            onChange={e => handleChangeRq({ keyword: e.target.value })
            }
            onFocus={fetchRecent}

            sx={{
              '& .MuiOutlinedInput-root': {
                height: 44,
                borderRadius: '10px',
                '& fieldset': {
                  borderWidth: 2,
                  borderColor: '#003FBF',
                },
              },
            }}
          />

          <IconButton
            onClick={handleSearch}
            sx={{
              ml: 4,
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#003FBF',
              '&:hover': {
                bgcolor: '#0035A5',
              },
            }}
          >
            <SearchIcon sx={{ color: '#fff', fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          mb: 1.5,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <OrderBar
          options={ORDER_OPTIONS}
          selected={searchRq.order}
          onChange={handleOrderChange}
        />
      </Box>


      {/* =================== 메인 테이블 =================== */}
      <Paper
        elevation={0}
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #CED4E4', // 전체 윤곽선
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
            key={(pagination?.pageNum - 1) * pagination?.pageSize + idx + 1}
            sx={{
              display: 'grid',
              gridTemplateColumns: '80px 300px 1fr',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              minHeight: 72,
              borderTop: idx === 0 ? '1px solid #CED4E4' : '1px solid #E3E7F2',
              bgcolor: '#FFFFFF',
            }}
          >

            {/* No */}
            <Typography
              variant="body2"
              align="center"
              sx={{ fontSize: 13 }}
            >
              {(pagination?.pageNum ?? 0) * pagination?.pageSize + idx + 1}
            </Typography>
            {/* 
              주제 
              <Typography
                variant="body2"
                align="center"
                sx={{ fontSize: 13 }}
              >
                {row.category}
              </Typography>
              */}
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

      {/* =================== 페이지네이션 =================== */}
      <PageBar pagination={pagination} onChange={handlePage} />
    </Box>

  );
}
