import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

/**
 * 최근 본 단어 목록 조회 훅
 * @author khj
 * @since 2025-12-14
 */
export function useRecentWordView() {
  // [1] 상태 변수 선언
  const [recentWords, setRecentWords] = useState([])
  const [loading, setLoading] = useState(true)

  const { showSnackbar } = useSnackbar()

  // [2] 성공 / 실패 콜백
  const onSuccess = rp => {
    setRecentWords(rp.data ?? [])
  }

  const onError = rp => {
    showSnackbar(rp.message ?? "최근 본 단어 조회에 실패했습니다.", "error")
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [3] API 호출 함수
  const fetchRecentWords = () => {
    setLoading(true)

    api.get(
      "/members/wordbook/view",
      {
        onSuccess,
        onError,
        onFinally,
      }
    )
  }

  // [4] 최초 1회 로딩
  useEffect(() => {
    fetchRecentWords();
  }, [])

  // [5] 반환
  return {
    recentWords,
    loading,
    refetch: fetchRecentWords,
  }
}