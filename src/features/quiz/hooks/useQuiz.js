import { useState, useEffect } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

export function useQuiz(open, step) {
  
  // [1] 필요 데이터 선언 
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useSnackbar()

  // [2] 필요 함수 선언

  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
      setQuiz(rp?.data);
  }

  const onError = rp => {
    showSnackbar(rp?.message || "퀴즈 데이터를 불러오지 못했습니다.")
  }

  const onFinally = () => {
    setLoading(false);
  }

  function fetchQuiz() {
    api.get(`/quiz/getQuestion`, { onSuccess, onError, onFinally });
  }



  // [4] REST API 요청 함수 정의 
  useEffect(()=>{
    console.log(step);    
    if (!open || !step || step !== 'quiz') return; 
    setLoading(true);
    fetchQuiz();
  }, [open, step]);

  // [5] 반환
  return { quiz, loading };
}