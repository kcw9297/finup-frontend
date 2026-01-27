import { Box, Typography, IconButton, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from "react";

// 문제 제출

export default function QuizQuestion ({ onClose, questions, onSubmit }) {
  // 배열 생성 + 제출 버튼 활성화
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const isAllAnswered = answers.every((a) => a !== null);
  
  // 원 숫자 변환 (0→①, 1→②, 2→③, 3→④)
  const getCircledNumber = (num) => {
    const circledNumbers = ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'];
    return circledNumbers[num] || num;
  };

  // 답안 선택
  const handleSelect = (questionIndex, value) => {
    const newAnswers = [...answers]
    newAnswers[questionIndex] = Number(value)
    setAnswers(newAnswers)
  }

  // 제출(답안 제출 -> 부모가 채점)
  const finish = () => onSubmit(answers);

  return(
    <>
      {/* 제목 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center',
          padding: '20px 10px',
          backgroundColor: 'base.dark',
          height: 60,
          p: 3,
          mb: -2
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.contrastText' }}>
          개념 확인 (총 10문항)
        </Typography>
        <IconButton
          onClick={onClose}
          disableRipple
          disableFocusRipple
          sx={{ color: 'text.contrastText', padding: '5px' }}
        >
          <CloseIcon/>
        </IconButton>
      </Box>

      {/* 문제 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '50px',
          margin: '30px 20px',
          maxHeight: '520px',
          overflowY: 'auto',
          p: 3
        }}
      >
        {questions.map((q, idx) => (
        <Box key={idx} sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
            {idx + 1}. {q.question} 
          </Typography>
          <RadioGroup value={answers[idx]} onChange={(e) => handleSelect(idx, e.target.value)}>
            {q.choices.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio sx={{opacity: 0, padding: 0, margin: '4px 2px'}}/>}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                    <Typography component="span" sx={{ fontSize: 16 }}>
                      {getCircledNumber(i)}
                    </Typography>
                    <Typography component="span" sx={{ fontSize: 16, flex: 1 }}>
                      {opt}
                    </Typography>
                  </Box>
                }
                sx={{
                  '& .MuiTypography-root': { 
                    fontSize: '16px', 
                    color: answers[idx] === null ? 'text.main' : answers[idx] === i ? 'base.main' : 'text.light' 
                  },
                  '&:hover .MuiTypography-root': { color: 'base.main' },
                }}
              />
            ))}
          </RadioGroup>
        </Box>
        ))}
        <Button
          variant='contained'
          onClick={finish}
          disabled={!isAllAnswered}
          sx={{
            width: 'fit-content',
            alignSelf: 'center',
            backgroundColor: 'background.base',
            color: 'base.dark',
            padding: '10px 20px',
            border: 2,
            borderColor: 'base.dark',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: 16,
            mt: 3,
            '&.Mui-disabled': {
              backgroundColor: 'background.base',
              color: 'text.light',
              borderColor: 'line.dark',
            },
            '&:hover': {
              backgroundColor: 'base.dark',
              color: 'text.contrastText',
            }
          }}
        >
          제출하기
        </Button>
      </Box>
    </>
  )
}