import { useEffect, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { useSearchParams } from "react-router-dom";
import { useReloadStore } from "../../../base/stores/useReloadStore";

/**
 * 뉴스 내 AI 단어 추천 기능 훅
 * @author kcw
 * @since 2026-01-27
 */
export function useNewsWordsAnalyzation(analyzeWord) {

  // [1] 필요 데이터 선언
  const [ newsId, setNewsId ] = useState(null);
  const [ open, setOpen ] = useState(false);
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  const [ analysisWords, setAnalysisWords ] = useState(null) // AI 분석 결과

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setAnalysisWords(rp.data)
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [4] API 요청 함수 정의
  const fetchAnalysisWords = () => {
    setLoading(true);
    api.get(`/news/${newsId}/analysis/words`, { onSuccess, onFinally, params: { retry: false } })
  }

  const retryAnalysisWords = () => {
    setLoading(true);
    api.get(`/news/${newsId}/analysis/words`, { onSuccess, onFinally, params: { retry: true } })
  }


  // URL 변경 시 입력 필드 동기화
  useEffect(() => {

    if (!analyzeWord) return

    if (open && newsId) {
      setLoading(true);  // 명시적으로 true 설정
      fetchAnalysisWords()

    } else if (!open) {
      // 모달 닫힐 때 상태 초기화
      setLoading(false);
      setAnalysisWords(null);
    }


  }, [newsId, open]);

  
  // [5] 반환
  return {
    analysisWords, loading,
    setNewsId, setOpen, retryAnalysisWords
  }
}