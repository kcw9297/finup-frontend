
import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

export function useWordQuiz() {
  // [1] 상태
  const [quiz, setQuiz] = useState(null)
  const [selected, setSelected] = useState(null)
  const [locked, setLocked] = useState(false)
  const [result, setResult] = useState(null) // true / false
  const [loading, setLoading] = useState(true)

  const { showSnackbar } = useSnackbar()

  // [2] 오늘의 퀴즈 조회
  const fetchTodayQuiz = () => {
    setLoading(true);

    api.get("/word-quizzes/today", {
      onSuccess: rp => {
        setQuiz(rp.data)
      },
      onError: () => {
        showSnackbar("퀴즈를 불러오지 못했습니다.", "error")
      },
      onFinally: () => {
        setLoading(false)
      }
    })
  }
  // [3] 정답 제출
  const submitAnswer = choice => {
    if (locked) return;

    setSelected(choice)
    setResult(null)

    api.post(
      `/word-quizzes/today/answer`, {
      onSuccess: rp => {
        const isCorrect = rp.data

        setResult(rp.data)
        if (isCorrect) {
          setLocked(true) // 🔥 정답일 때만 잠금
        }
      }
    },
      {
        termId: quiz.termId,
        selected: choice
      }
    )
  }

  // [4] 최초 로딩
  useEffect(() => {
    fetchTodayQuiz()
  }, [])


  // [5] 반환
  return {
    quiz,
    loading,
    selected,
    result,
    locked,
    submitAnswer
  }
}