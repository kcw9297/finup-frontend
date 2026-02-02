// WordSearchHeader.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useWordSearch } from '../hooks/useWordSearch';
import { useRecentSearch } from '../hooks/useRecentSearch';

export default function WordSearchHeader() {
  const navigate = useNavigate();
  const [openRecent, setOpenRecent] = useState(false);

  const {
    searchRq,
    handleChangeRq,
    handleSearch,
  } = useWordSearch();

  // 추가: useRecentSearch 훅 사용
  const { recentKeywords, refresh, loading: recentKeywordsLoading } = useRecentSearch();

  const executeSearch = () => {
    if (searchRq.keyword?.trim()) {
      handleSearch();
      setOpenRecent(false);
    }
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      {/* 제목 섹션 */}
      <Box sx={{ mb: 5, mx: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          단어장
        </Typography>
        <Typography variant="body2" color="text.secondary">
          경제 단어로 투자 지식을 익혀봐요
        </Typography>
      </Box>

      {/* 검색창 */}
      <Box sx={{ maxWidth: 1000, mx: 'auto', position: 'relative' }}>
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
              placeholder="검색어를 입력하세요"
              onChange={e => handleChangeRq({ keyword: e.target.value })}
              onFocus={() => {
                refresh();
                setOpenRecent(true);
              }}
              onBlur={() => setTimeout(() => setOpenRecent(false), 150)}
              onKeyUp={(e) => {
                if (e.key === 'Enter') executeSearch();
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
            {!recentKeywordsLoading && openRecent && recentKeywords.length > 0 && (
              <Paper
                elevation={0}
                sx={{
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  right: 0,
                  zIndex: 10,
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid #E0E0E0'
                }}
              >
                {recentKeywords.map((word) => (
                  <Box
                    key={word}
                    onMouseDown={() => {
                      setOpenRecent(false);
                      const params = new URLSearchParams({ keyword: word });
                      navigate({
                        pathname: "/words/search",
                        search: `?${params.toString()}`
                      });
                    }}
                    sx={{
                      px: 2,
                      py: 1.2,
                      cursor: 'pointer',
                      fontSize: 13,
                      '&:hover': { bgcolor: '#F2F5FF' },
                    }}
                  >
                    {word}
                  </Box>
                ))}
              </Paper>
            )}
          </Box>

          <IconButton
            onClick={executeSearch}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#003FBF',
              '&:hover': { bgcolor: '#0035A5' },
            }}
          >
            <SearchIcon sx={{ color: '#fff', fontSize: 22 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}