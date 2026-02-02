import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 공지사항 삭제 훅
 * @author khj
 * @since 2025-12-03
 */

export function useNoticeRemove() {

  // [1] 필요한 변수 선언
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    showSnackbar(rp.message, "success")
    navigate("/admin/notices")
  }

  const onError = rp => {
    showSnackbar(rp.message, "error")
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