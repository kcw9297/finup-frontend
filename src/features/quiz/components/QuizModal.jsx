import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";

import { useQuiz } from "../hooks/useQuiz";
import QuizIntro from "./QuizIntro";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";

// 기본 모달 창

export default function QuizModal ({ open, onClose }) {
  //quiz 데이터
  const { quiz, loading } = useQuiz();
  
  // 화면 관리
  const [step, setStep] = useState("intro");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleStart = () => setStep("quiz");

  // questions가 준비되면 answers 배열 초기화
  useEffect(() => {
    if (quiz?.length) {
      setAnswers(Array(quiz.length).fill(null));
    }
  }, [quiz]);

  // 점수 계산
  const handleSubmit = (userAnswers) => {
    const result = userAnswers.reduce((acc, curr, idx) => {
      return curr === quiz[idx].answer ? acc + 10 : acc;
    }, 0);

    setAnswers(userAnswers);
    setScore(result);
    setStep("result");
  };

  // 닫으면 초기화
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
      <>
        {step === "intro" && <QuizIntro onStart={handleStart} onClose={onClose} />}
        {step === "quiz" && (
          <>
            {loading && <div>로딩중...</div>}
            {!loading && !quiz?.length && <div>문제가 없습니다.</div>}
            {!loading && quiz?.length > 0 && (
            <QuizQuestion onClose={handleClose} questions={quiz} onSubmit={handleSubmit}/>
            )}
          </>
        )}
        {step === "result" && (<QuizResult score={score} onClose={handleClose}/>)}
      </>
      </Box>
    </Modal>
  )
}