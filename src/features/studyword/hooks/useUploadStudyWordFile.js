
/**
 * 파일 업로드
 * @author kcw
 * @since 2025-12-09
 */

import { useState } from "react"
import { useSnackbar } from "../../../base/provider/SnackbarProvider"
import { api } from "../../../base/utils/fetchUtils"

export function useUploadStudyWordFile() {

  // [1] 사용 상태 및 데이터
  const { loading, setLoading } = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 성공/실패/최종 콜백함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
  }

  const onFinally = (rp) => {
    setLoading(false)
  }

  // [3] REST API 요청 함수 선언
  const handleSubmit = (studyWordId) => {
    setLoading(true)
    api.postImage(`${studyWordId}/image`, {}) // FormData 필요
  }

  // [4] 반환
  return {


  }
}