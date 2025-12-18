import { useState, useEffect } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useQuiz(){
  
  // [1] 필요 데이터 선언 
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  // [2] 필요 함수 선언 //없음 생략
  // [3] 성공/실패 콜백 함수 정의 //없음 생략

  // [4] REST API 요청 함수 정의 
  useEffect(()=>{
    if (!open) return; 
    setLoading(true);
    async function fetchQuiz() {
      const rp = await api.get(`/quiz/getQuestion`);
      setQuiz(rp.data);
      setLoading(false);
    }
    fetchQuiz();
  }, [open]);
  // [5] 반환
  return { quiz, loading };
}