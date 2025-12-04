import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

export function useNoticeRemove() {

  // [1] 필요한 변수 선언
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = () => {
    showSnackbar("해당 공지사항 게시물을 삭제했습니다.", "success")
    navigate("/admin/notices")
  }

  const onError = rp => {
    showSnackbar("해당 공지사항 삭제에 실패했습니다.", "error")
  }

  const onFinally = () => {

  }

  // [3] 삭제 요청 함수
  const removeNotice = (noticeId) => {
    return api.delete(
      `/notices/${noticeId}`,
      { admin: true, onSuccess, onError, onFinally }
    )
  }

  // [4] 훅 반환 값
  return {
    removeNotice
  }
}