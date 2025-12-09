import { Box } from "@mui/material";
import { useState } from "react";
import QuizModal from "/src/features/quiz/components/QuizModal.jsx";
import banner from '../../../assets/banner.png';

// 개념 테스트 이동 배너

export default function Banner () {
  const [open, setOpen] = useState(false)

  return(
    <>
      <Box onClick={() => setOpen(true)}
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
        <img src={banner} alt="배너" style={{height:300, borderRadius:20}}/>
      </Box>

      <QuizModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}