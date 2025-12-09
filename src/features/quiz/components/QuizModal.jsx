import { Box, Modal } from "@mui/material";
import { useState } from "react";

export function QuizModal ({ open, onClose }) {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          margin: '120px auto',
          backgroundColor: 'background.base',
          borderRadius: 3,
          padding: 3,
          outline: 'none',
          textAlign: 'center',
        }}
      >
        테스트 모달
      </Box>
    </Modal>
  )
}