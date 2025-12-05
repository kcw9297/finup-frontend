import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

const INITIAL_DETAIL_RQ = { noticeId: null }

/**
 * 공지사항 상세 정보 훅
 * @author khj
 * @since 2025-12-02
 */
export function useNoticeDetail() {
  // [1] 필요 데이터 선언
  const [detailRq, setDetailRq] = useState(INITIAL_DETAIL_RQ)
  const [detailRp, setDetailRp] = useState(null)

  const [loading, setLoding] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 입력 데이터 상태 변경 함수
  const changeDetailRq = rq =>
    setDetailRq(prev => ({ ...prev, ...rq }))

  // [3] 성공/실패/콜백 정의
  const onSuccess = rp => {
    setDetailRp(rp.data)
  }
  const onError = () => {
    showSnackbar("공지사항 정보를 가져오지 못했습니다.", "error")
  }
  const onFinally = () => {
    setLoding(false)
  }

  // [4] REST API 호출 함수 정의
  const fetchDetail = () => {
    if (!detailRq.noticeId) return

    setDetailRp(null)
    setLoding(true)

    api.get(
      `/notices/${detailRq.noticeId}`,
      {
        admin: true,
        onSuccess, onError, onFinally
      }
    )
  }

  // [5] noticeId 변경 시 자동 실행
  useEffect(() => {
    if (detailRq.noticeId) {
      (async () => {
        fetchDetail();
      })()
    }
  }, [detailRq.noticeId])

  // [6] 반환
  return {
    detailRq, detailRp, loading,
    changeDetailRq, fetchDetail,
  }
}