import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useReloadStore } from "../../../base/stores/useReloadStore";


/**
 * 단계별 학습 상세 데이터 custom hook
 * @since 2025-12-08
 * @author kcw
 */

export function useStudyDetail({ admin = false }) {

  // [1] 필요 데이터 선언
  const [ detailRp, setDetailRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  const { reloading } = useReloadStore() // 리로딩 감지
  const { studyId } = useParams(); //  경로 변수
  const navigate = useNavigate()

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setDetailRp(rp)
  }

  const onError = rp => {
    if (rp.status === 'STUDY_NOT_FOUND') navigate(-1, { replace: true }) // 없는 정보면 목록으로
    setDetailRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [3] API 요청 함수 정의
  useEffect(() => { // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용
    setLoading(true);
    api.get(`/studies/${studyId}`, { onSuccess, onError, onFinally, admin })
  }, [studyId, reloading])
  

  // [4] 반환
  return {
    detailRp, loading
  }
}
