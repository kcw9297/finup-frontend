import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useNavigate, useParams } from "react-router-dom";

/**
 * 공지사항 상세 정보 훅
 * @author khj
 * @since 2025-12-02
 */

export function useNoticeDetail({ admin = false }) {

  // [1] 사용 상태 선언
  const { noticeId } = useParams()
  const [ detailRp, setDetailRp ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()


  // [2] 성공/실패/콜백 정의
  const onSuccess = (rp) => {
    setDetailRp(rp)
  }

  const onError = (rp) => {

    // 조회 실패 메세지 출력
    showSnackbar(rp.message)
    setDetailRp(null)
    
    // 잠시 후 목록으로 리다이렉트
    setTimeout(() => {
      const redirect = admin ? '/admin/notices' : '/notices'
      navigate(redirect, { replace: true })
    }, 300);
  }
  const onFinally = () => {
    setLoading(false)
  }

  // [3] useEffect 선언
  useEffect(() => {

    // noticeId가 로드된 경우에만 조회
    if (noticeId) api.get(`/notices/${noticeId}`, { onSuccess, onError, onFinally, public: true })

  }, [noticeId])

  // [4] 반환
  return {
    noticeId, detailRp, loading
  }
}