import { useEffect, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 학습 영상 목록 custom hook
 * @since 2025-12-11
 * @author kcw
 */

export function useVideoLists({ target, admin = false }) {

  // [1] 필요 데이터 선언
  const [ ListRp, setListRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(false) // 로딩 상태

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setListRp(rp)
  }

  const onError = rp => {
    setListRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [3] useEffect 및 REST API 요청 함수 선언
  useEffect(() => {
    setLoading(true)
    api.get('/video-links/recommendation', { params: target, onSuccess, onError, onFinally, admin })
  }, []) // 단 한번 조회

  // 영상 리프래쉬 (AI 재추천)
  const refresh = () => {
    setLoading(true)
    api.get('/video-links/recommendation/refresh', { params: target, onSuccess, onError, onFinally, admin })
  }

  // [4] 반환
  return {
    ListRp, loading,
    refresh
  }
}