import React, { useState } from 'react';
import { Box, Typography, Chip, Button, Stack, Divider, Paper, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import WordbookPopup from './WordbookPopup';
import { useRecentSearch } from '../hooks/useRecentSearch';

export default function WordSidebar() {
  const [openWordbook, setOpenWordbook] = useState(false);
  const navigate = useNavigate();
  const { recentKeywords, loading, removeRecentWord } = useRecentSearch();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
      {/* 최근 검색어 */}
      <Box sx={{ borderRadius: 2, p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
          최근 검색어
        </Typography>

        {loading ? (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            <Skeleton variant="rounded" width={60} height={24} sx={{ borderRadius: '999px' }} />
            <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: '999px' }} />
            <Skeleton variant="rounded" width={70} height={24} sx={{ borderRadius: '999px' }} />
            <Skeleton variant="rounded" width={50} height={24} sx={{ borderRadius: '999px' }} />
          </Stack>
        ) : recentKeywords.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            최근 검색어가 없습니다.
          </Typography>
        ) : (
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {recentKeywords.map((kw) => (
              <Chip
                key={kw}
                label={kw}
                size="small"
                onClick={() => {
                  const params = new URLSearchParams({ keyword: kw });
                  navigate({
                    pathname: "/words/search",
                    search: `?${params.toString()}`
                  });
                }}
                onDelete={(e) => {
                  e.stopPropagation();
                  removeRecentWord(kw);
                }}
                variant="outlined"
                sx={{
                  borderRadius: '999px',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F5F5F5' },
                  '& .MuiChip-deleteIcon': { fontSize: 16 },
                }}
              />
            ))}
          </Stack>
        )}
      </Box>

      <Divider />

      {/* 내 단어장 */}
      <Paper elevation={0} sx={{ borderRadius: 2, p: 3 }}>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          스크랩한 단어 모아보기
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}>
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
      <Paper elevation={0} sx={{ borderRadius: 2, p: 3 }}>
        <Typography variant="caption" sx={{ fontWeight: 700 }}>
          참고 자료
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}>
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

      <WordbookPopup
        open={openWordbook}
        onClose={() => setOpenWordbook(false)}
      />
    </Box>
  );
}