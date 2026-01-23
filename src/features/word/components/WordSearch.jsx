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
            position: 'relative',
          }}
          onKeyUp={(e) => handleSearchEnter(e)}
        >
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            columnGap: 2,
            alignItems: 'center',
          }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                value={searchRq.keyword}
                fullWidth
                size="small"
                onChange={e => handleChangeRq({ keyword: e.target.value })}
                onFocus={() => {
                  fetchRecent()
                  setOpenRecent(true)
                }}
                onBlur={() => {
                  // 바로 닫지 말고 약간 지연
                  setTimeout(() => setOpenRecent(false), 150)
                }}

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

              {/* 최근 검색어 드롭다운 */}
              {openRecent && recent.length > 0 && (
                <Paper
                  elevation={0}
                  sx={{
                    position: 'absolute',
                    top: 48,        // TextField 바로 아래
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    borderRadius: '10px',
                    overflow: 'hidden',
                    border: '1px solid'
                  }}
                >
                  {recent.map((word) => (
                    <Box
                      key={word}
                      onMouseDown={() => {
                        handleChangeRq({ keyword: word })
                        handleSearch()
                      }}
                      sx={{
                        px: 2,
                        py: 1.2,
                        cursor: 'pointer',
                        fontSize: 13,
                        '&:hover': {
                          bgcolor: '#F2F5FF',
                        },
                      }}
                    >
                      {word}
                    </Box>
                  ))}
                </Paper>
              )}
            </Box>

            <IconButton
              onClick={handleSearch}
              sx={{
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
              {idx + 1}
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

  )
}
