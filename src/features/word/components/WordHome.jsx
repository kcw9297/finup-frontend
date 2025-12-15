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
import { useNavigate } from 'react-router-dom';

import { useWordHome } from '../hooks/useWordHome';
import { useRecentSearch } from '../hooks/useRecentSearch';
import { useWordSearch } from '../hooks/useWordSearch';
import { useWordQuiz } from '../hooks/useWordQuiz';

export default function WordHome() {
  const [openWordbook, setOpenWordbook] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const { homeData, loading } = useWordHome();

  const { recentKeywords, removeRecentWord } = useRecentSearch()
  const [openRecent, setOpenRecent] = useState(false)
  const todayWords = homeData ?? [];



  const {
    searchRq,
    wordList,
    pagination,

    handleChangeRq,
    handleSearch,
    handlePage,
    handleSearchEnter,
    handleOrderChange,

    recent,
    fetchRecent,
  } = useWordSearch()

  const {
    quiz,
    locked,
    loading: quizLoading,
    selected,
    result,
    submitAnswer,
  } = useWordQuiz()

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
              {todayWords.map((words) => (
                <Paper
                  key={words.termId}
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
                    '&:hover': {
                      bgcolor: '#F6F8FF',
                    },
                  }}
                  onClick={() => navigate(`/words/detail/${words.termId}`)}
                >
                  <Typography variant="caption">키워드</Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700 }}
                  >
                    {words.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 4,        // ← 보여줄 줄 수
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {words.description}
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
                textAlign: 'left',
                pl: 0.5,
              }}
            >
              오늘의 퀴즈
            </Typography>

            {quizLoading && (
              <Typography variant="body2" color="text.secondary">
                퀴즈를 불러오는 중...
              </Typography>
            )}

            {!quizLoading && quiz && (
              <Paper
                variant="outlined"
                sx={{
                  px: 3,
                  py: 2,
                  borderRadius: 2,
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Typography variant="caption">금융</Typography>

                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  다음 설명으로 알맞은 단어는?
                </Typography>

                <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                  {quiz.question}
                </Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                  {quiz.choices.map((opt) => {
                    const isSelected = selected === opt;

                    return (
                      <Button
                        key={opt}
                        variant="outlined"
                        size="small"
                        disabled={locked}
                        onClick={() => submitAnswer(opt)}
                        sx={{
                          flex: 1,
                          maxWidth: 260,
                          justifyContent: 'center',
                          minHeight: 36,
                          whiteSpace: 'normal',
                          borderRadius: 1.5,
                          borderColor: isSelected
                            ? result
                              ? 'success.main'
                              : 'error.main'
                            : 'divider',
                          textAlign: 'center',
                        }}
                      >
                        {opt}
                      </Button>
                    );
                  })}
                </Stack>

                {result === false && !locked && (
                  <Typography color="error.main" sx={{ mt: 1 }}>
                    틀렸어요! 다시 한 번 골라보세요 🙂
                  </Typography>
                )}

                {result === true && locked && (
                  <Typography color="success.main" sx={{ mt: 1 }}>
                    정답입니다 🎉
                  </Typography>
                )}
              </Paper>
            )}
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
                  onDelete={(e) => {
                    e.stopPropagation()
                    removeRecentWord(kw)
                  }}
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





