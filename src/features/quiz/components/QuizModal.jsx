import { Box, Modal } from "@mui/material";
import { useState } from "react";

import { useQuiz } from "../hooks/useQuiz";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";

export default function QuizModal ({ open, onClose }) {
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleStart = () => setStep("quiz");

  const handleSubmit = (userAnswers) => {
    const result = userAnswers.reduce((acc, curr, idx) => {
      return curr === useQuiz[idx].answer ? acc + 10 : acc;
    }, 0);

    setAnswers(userAnswers);
    setScore(result);
    setStep("result");
  };

  const handleClose = () => {
    setStep("intro");
    setAnswers([]);
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 800,
          margin: '120px auto',
          backgroundColor: 'background.base',
          border: 5,
          borderColor: 'base.dark',
          borderRadius: '20px',
          outline: 'none',
        }}
      >
        {step === "intro" && <QuizIntro onStart={handleStart} onClose={onClose}/>}
        {step === "quiz" && (<QuizQuestion onClose={onClose} questions={useQuiz} onSubmit={handleSubmit}/>)}
      </Box>
    </Modal>
  )
}