
import { useRef, useState } from "react"
import { useSnackbar } from "../../../base/provider/SnackbarProvider"
import { api } from "../../../base/utils/fetchUtils"


/**
 * 파일 업로드
 * @author kcw
 * @since 2025-12-09
 */

export function useUploadStudyWordImage({ admin = false }) {

  // [1] 사용 상태 및 데이터
  const [ uploadRq, setUploadRq ] = useState()
  const [ loading, setLoading ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 필요 함수 선언


  // [3] 성공/실패/최종 콜백함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
  }

  const onError = (rp) => {
    if (rp?.inputErrors) showSnackbar(rp.inputErrors.wordImage, 'error')
  }


  const onFinally = (rp) => {
    setLoading(false)
  }

  // [3] REST API 요청 함수 선언
  // 파일 업로드 처리 함수
  const handleUploadImage = (studyWordId, file) => {

    // FormData 생성
    const formData = new FormData()
    formData.append('wordImage', file)

    // 파일 상태 변경
    setUploadRq(file)
    setLoading(true)

    // 요청 수행
    return api.postImage(`/study-words/${studyWordId}/image`, {onSuccess, onError, onFinally, admin}, formData)
  };

  // [4] 반환
  return {
    uploadRq, loading,
    handleUploadImage
  }
}