import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 홈 공지사항 리스트 훅
 * @author kcw
 * @since 2025-12-15
 */
export function useHomeNoticeList({ admin = false }) {

  // [1] 필요 데이터 선언
  const [ listRp, setListRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  
  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setListRp(rp)
  }

  const onError = (rp) => {
    setListRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [3] useEffect & API 요청 함수 정의
  useEffect(() => {
    setLoading(true)
    api.get('/notices/home', { onSuccess, onError, onFinally, public: true })
  }, [])
  

  // [4] 반환
  return { listRp, loading }
}