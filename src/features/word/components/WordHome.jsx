import React from 'react';
import { Box, Typography, Paper, Button, Stack, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useWordHome } from '../hooks/useWordHome';
import { useWordQuiz } from '../hooks/useWordQuiz';

export default function WordHome() {
  const navigate = useNavigate();
  const { homeData, loading, error } = useWordHome();
  const todayWords = homeData ?? [];

  const {
    quiz,
    locked,
    loading: quizLoading,
    error: quizError,
    selected,
    result,
    submitAnswer,
  } = useWordQuiz();

  return (
    <Box sx={{ 
      maxWidth: 1000,
      mx: 'auto',
      width: '100%',
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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error || todayWords.length === 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              단어를 불러오지 못했습니다.
            </Typography>
          </Box>
        ) : (
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
        )}
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

        {quizLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : quizError || !quiz ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              퀴즈를 불러오지 못했습니다.
            </Typography>
          </Box>
        ) : (
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