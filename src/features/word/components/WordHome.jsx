// src/features/word/components/WordHome.jsx
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
import WordbookPopup from './WordbookPopup';

export default function WordHome() {
  const [openWordbook, setOpenWordbook] = useState(false);

  const todayWords = [
    {
      wordId: 1,
      keyword: '재무제표',
      description:
        '기업의 경영활동을 일반적으로 인정된 회계원칙에 따라 간결하게 요약한 재무보고서로, 기업의 상품을 정확히 파악하기 어려운 사람들에게 기업과 관련된 재무 정보를 제공해 주는 데 목적이 있다.',
    },
    {
      wordId: 2,
      keyword: '자기자본',
      description:
        '기업의 총자산에서 타인자본을 제외한 부분으로 기업 소유주의 지분을 의미하며, 기업의 재무 건전성과 안정성을 판단하는 핵심 지표로 활용된다.',
    },
    {
      wordId: 3,
      keyword: '영업이익',
      description:
        '기업의 본업에서 벌어들인 이익을 나타내는 지표로 매출총이익에서 판매비와 관리비를 차감한 금액이며, 회사의 실제 영업 성과를 나타내는 대표적인 지표이다.',
    },
  ];

  const todayQuizzes = [
    {
      quizId: 1,
      category: '금융',
      question: '다음 설명으로 알맞은 단어는?',
      description:
        '장래 일정 시점에 미리 정한 가격으로 매매할 것을 현재 시점에서 약정하는 거래로, 미래의 가치를 사고 파는 것.',
      options: ['선물거래', '합성선물'],
    },
    {
      quizId: 2,
      category: '금융',
      question: '다음 설명으로 알맞은 단어는?',
      description:
        '위험회피를 목적으로 시작했으나, 고도의 레버리지를 활용해 투기적 거래에 사용되기도 하는 파생상품으로, 기초자산의 가격 변동에 연동해 가치가 변화한다.',
      options: ['선물거래', '합성선물'],
    },
  ];

  const recentKeywords = ['적자', '흑자', '영업이익', '포괄손익계산서', '재무제표', '매출총이익'];

  return (
    <Box sx={{ width: '100%', minHeight: '100%', py: 3 }}>
      {/* ================== SearchBar ================== */}
      <Box
        sx={{
          maxWidth: 1120,
          mx: 'auto',
          mt: 1,
          mb: 4,
        }}
      >
        <Box
          sx={{
            maxWidth: 780,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            fullWidth
            placeholder="검색어를 입력하세요."
            size="small"
            variant="outlined"
            InputProps={{
              sx: {
                height: 44,
                borderRadius: 2,
              },
            }}
          />


          <IconButton
            sx={{
              bgcolor: '#003FBF',
              borderRadius: '8px',
              width: '40px',
              height: '40px',
              ml: '20px',
              '&:hover': {
                bgcolor: '#0035A5',
              },
            }}
          >
            <SearchIcon sx={{ color: '#fff', fontSize: 22 }} />
          </IconButton>

        </Box>
      </Box>

      {/* ================== Main Grid ================== */}
      <Box
        sx={{
          maxWidth: 1120,
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


        {/* ========== 왼쪽 오늘의 단어 / 오늘의 퀴즈 ========== */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* 오늘의 단어 */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              // align="center"  // 삭제
              sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: 'left',   // 왼쪽 정렬
                pl: 0.5,              // 살짝 안쪽으로
              }}
            >
              오늘의 단어
            </Typography>

            <Stack
              direction="row"
              spacing={3}

            >
              {todayWords.map((word) => (
                <Paper
                  key={word.wordId}
                  variant="outlined"
                  sx={{
                    //flex: 1,
                    width: "360px",
                    px: 2,          //  세로 padding 줄임
                    py: 2,
                    minHeight: "190px",
                    borderRadius: 2,
                    minWidth: 0,
                    display: 'flex',          // 내용 압축
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography variant="caption">키워드</Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                  >
                    {word.keyword}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.5 }}
                  >
                    {word.description}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Box>

          {/* 오늘의 퀴즈 */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                mb: 2,
                textAlign: 'left',  // 왼쪽 정렬
                pl: 0.5,
              }}
            >
              오늘의 퀴즈
            </Typography>

            <Stack direction="row" spacing={3}>
              {todayQuizzes.map((quiz) => (
                <Paper
                  key={quiz.quizId}
                  variant="outlined"
                  sx={{
                    flex: 1,
                    px: 3,
                    py: 2,
                    borderRadius: 2,
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                  }}
                >
                  <Typography variant="caption">{quiz.category}</Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                  >
                    {quiz.question}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.5 }}
                  >
                    {quiz.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                    {quiz.options.map((opt) => (
                      <Button
                        key={opt}
                        variant="outlined"
                        size="small"
                        sx={{ borderRadius: 1.5 }}
                      >
                        {opt}
                      </Button>
                    ))}
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        </Box>


        {/* ========== 오른쪽 최근 검색어 ========== */}
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
                  onDelete={() => { }}
                  variant="outlined" //토글배경색상
                  sx={{
                    borderRadius: '999px', // pill 형태 라운드
                    '& .MuiChip-deleteIcon': {
                      fontSize: 16,
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>

          {/* 최근 검색어 아래 긴 가로선*/}
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
              이렇게 달라집니다!
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
              onClick={() => setOpenWordbook(true)}   //  팝업 실행 추가
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
              이렇게 달라집니다!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, mt: 1, mb: 1.5 }}
            >
              기획재정부 시사·경제 용어 사전
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
            <Typography variant="body2" align="center">
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
