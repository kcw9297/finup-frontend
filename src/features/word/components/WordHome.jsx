// WordHome.jsx
import React from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWordHome } from '../hooks/useWordHome';
import { useWordQuiz } from '../hooks/useWordQuiz';

export default function WordHome() {
  const navigate = useNavigate();
  const { homeData, loading } = useWordHome();
  const todayWords = homeData ?? [];

  const {
    quiz,
    locked,
    loading: quizLoading,
    selected,
    result,
    submitAnswer,
  } = useWordQuiz();

  return (
    <Box sx={{ 
      maxWidth: 1000,  // 추가: WordSearch와 동일한 너비
      mx: 'auto',      // 추가: 중앙 정렬
      width: '100%',   // 추가: 반응형 대응
      py: 3 
    }}>
      {/* 오늘의 단어 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            textAlign: 'left',
            pl: 0.5,
          }}
        >
          오늘의 단어
        </Typography>

        <Stack direction="row" spacing={3}>
          {todayWords.map((words) => (
            <Paper
              key={words.termId}
              variant="outlined"
              sx={{
                width: "360px",
                px: 2,
                py: 2,
                minHeight: "190px",
                borderRadius: 2,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#F6F8FF',
                },
              }}
              onClick={() => navigate(`/words/detail/${words.termId}`)}
            >
              <Typography variant="caption">키워드</Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {words.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
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
                      maxWidth: 230,
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
  );
}