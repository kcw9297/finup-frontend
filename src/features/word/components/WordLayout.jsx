import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Chip,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import WordbookPopup from './WordbookPopup';
import { useRecentSearch } from '../hooks/useRecentSearch';
import { useWordSearch } from '../hooks/useWordSearch';

export default function WordLayout({ children }) {
  const [openWordbook, setOpenWordbook] = useState(false);
  const navigate = useNavigate();

  const { recentKeywords, refresh, removeRecentWord } = useRecentSearch(); // addRecentWord 제거
  const [openRecent, setOpenRecent] = useState(false);

  const {
    searchRq,
    handleChangeRq,
    handleSearch,
    handleSearchEnter,
    recent,
    fetchRecent,
  } = useWordSearch();

  // 검색 실행 래퍼 함수
  const executeSearch = () => {
    if (searchRq.keyword?.trim()) {
      handleSearch() // 검색 실행 (백엔드에서 자동으로 최근 검색어 저장)
      setOpenRecent(false)
      // 검색 완료 후 최근 검색어 목록 갱신
      setTimeout(() => refresh(), 500)
    }
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4 }}>
      {/* 제목 섹션 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          단어장
        </Typography>
        <Typography variant="body2" color="text.secondary">
          경제 단어로 투자 지식을 익혀봐요
        </Typography>
      </Box>

      {/* 검색창 */}
      <Box
        sx={{
          maxWidth: 1000,
          mx: 'auto',
          position: 'relative',
        }}
      >
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          columnGap: 2,
          alignItems: 'center',
          mb: 5
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
                setTimeout(() => setOpenRecent(false), 150)
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  executeSearch()
                }
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
                  top: 48,
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
                      setOpenRecent(false)
                      // addRecentWord 제거 - 백엔드에서 자동 저장
                      const params = new URLSearchParams({
                        keyword: word,
                      })
                      navigate({
                        pathname: "/words/search",
                        search: `?${params.toString()}`
                      })
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
            onClick={executeSearch}
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

      {/* 메인 그리드 */}
      <Box
        sx={{
          maxWidth: 1300,
          mx: 'auto',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 3.5fr) minmax(260px, 1.4fr)',
          columnGap: 4,
          alignItems: 'flex-start',
        }}
      >
        {/* 가운데 세로선 */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '72%',
            width: '1px',
            bgcolor: '#BDBDBD',
            zIndex: 0,
            opacity: 0.7,
          }}
        />

        {/* 왼쪽 메인 컨텐츠 (교체 가능) */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {children}
        </Box>

        {/* 오른쪽 사이드바 (고정) */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3,
          }}
        >
          {/* 최근 검색어 */}
          <Box sx={{ borderRadius: 2, p: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mb: 2 }}
            >
              최근 검색어
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1}>
              {recentKeywords.map((kw) => (
                <Chip
                  key={kw}
                  label={kw}
                  size="small"
                  onClick={() => {
                    const params = new URLSearchParams({
                      keyword: kw,
                    })
                    navigate({
                      pathname: "/words/search",
                      search: `?${params.toString()}`
                    })
                  }}
                  onDelete={(e) => {
                    e.stopPropagation()
                    removeRecentWord(kw)
                  }}
                  variant="outlined"
                  sx={{
                    borderRadius: '999px',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: '#F5F5F5',
                    },
                    '& .MuiChip-deleteIcon': {
                      fontSize: 16,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 1 }} />

          {/* 내 단어장 */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              스크랩한 단어 모아보기
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}
            >
              내 단어장
            </Typography>

            <Divider sx={{ mb: 1.5 }} />

            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 2, mt: 0.5 }}
              onClick={() => setOpenWordbook(true)}
            >
              바로가기
            </Button>
          </Paper>

          {/* 기획재정부 사전 */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              참고 자료
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}
            >
              기획재정부 시사·경제 용어 사전
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Typography
              variant="body2"
              align="center"
              component="a"
              href="https://www.moef.go.kr/sisa/main/main"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                cursor: 'pointer',
                fontWeight: 600,
                color: 'primary.main',
              }}
            >
              바로가기
            </Typography>
          </Paper>
        </Box>
      </Box>

      <WordbookPopup
        open={openWordbook}
        onClose={() => setOpenWordbook(false)}
      />
    </Box>
  );
}