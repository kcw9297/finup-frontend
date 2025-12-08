import { Box, Modal } from "@mui/material";
import { useState } from "react";

export function QuizModal ({ open, onClose }) {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        테스트 모달
      </Box>
    </Modal>
  )
}