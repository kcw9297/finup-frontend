
import { useRef, useState } from "react"
import { useSnackbar } from "../../../base/provider/SnackbarProvider"
import { api } from "../../../base/utils/fetchUtils"


/**
 * 파일 업로드
 * @author kcw
 * @since 2025-12-09
 */


export function useUploadStudyWordImage() {

  // [1] 사용 상태 및 데이터
  const fileUploadRef = useRef(null); //  hidden 처리된 input dom 참조 값
  const [ previewUrl, setPreviewUrl ] = useState(null); // 업로드 파일의 파일 url 
  const [ loading, setLoading ] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 필요 함수 선언
  const handleUploadClick = () => {
    fileUploadRef.current?.click() // hidden 처리된 input 클릭 이벤트
  }

  // [3] 성공/실패/최종 콜백함수 선언
  const onSuccess = (rp) => {
    showSnackbar(rp.message, 'success')
  }

  const onFinally = (rp) => {
    setLoading(false)
  }

  // [3] REST API 요청 함수 선언
  // 파일 업로드 처리 함수
  const handleUpload = (studyWordId) => (event) => {

    // 사용자가 업로드한 파일
    const file = event.target.files[0];

    // 파일이 없는 경우, 사용자가 업로드를 취소함을 안내
    if (!file) {
      showSnackbar('파일 업로드를 취소했습니다.', 'error')
      return
    }

    // 파일 업로드 처리 수행
    //const previewUrl = URL.createObjectURL(file);
    
  };


  // [4] 반환
  return {


  }
}