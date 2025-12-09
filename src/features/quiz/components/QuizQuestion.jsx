import { Box, Typography, IconButton, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

export default function QuizQuestion ({ onClose, questions, onSubmit }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [index, setIndex] = useState(0)

  const q = questions[index];

  const handleSelect = (value) => {
    const newAnswers = [...answers]
    newAnswers[index] = Number(value)
    setAnswers(newAnswers)
  }

  const finish = () => onSubmit(answers);

  return(
    <>
      {/* 제목 */}
      <Box sx={{ display: 'flex', justifyContent:'space-between', alignItems: 'center',  padding: '20px 10px', backgroundColor: 'base.dark'}}>
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: 'text.contrastText' }}>
          개념 확인 (총 10문항)
        </Typography>
        <IconButton
          onClick={onClose}
          disableRipple
          disableFocusRipple
          sx={{
            color: 'text.contrastText', padding: '5px',
            "&:hover": {
              backgroundColor: 'base.darkHover'
            }
          }}
        >
          <CloseIcon/>
        </IconButton>
      </Box>

      {/* 문제 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px', margin: '30px 20px'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
            {index + 1}. {q.question}
          </Typography>
          <RadioGroup value={answers[index]} onChange={(e) => handleSelect(e.target.value)}>
            {q.options.map((opt, i) => (
              <FormControlLabel
                key={i}
                value={i}
                control={<Radio sx={{opacity: 0, padding: 0, margin: '4px 2px'}}/>}
                label={opt}
                sx={{
                  '& .MuiTypography-root': { fontSize: '16px', color: answers[index] === null ? 'text.main' : answers[index] === i ? 'base.main' : 'text.light' },
                  '&:hover .MuiTypography-root': { color: 'base.main' },
                }}
              />
            ))}
          </RadioGroup>
        </Box>
        <Button
          variant='contained'
          sx={{
            width: 'fit-content',
            alignSelf: 'center',
            backgroundColor: 'background.base',
            color: 'base.dark',
            padding: '10px 20px',
            border: 2,
            borderColor: 'base.dark',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: 16,
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