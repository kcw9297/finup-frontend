import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";

/**
 * 유튜브 영상 삭제 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubeRemove() {

  // [1] 필요한 상태/함수
  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // [2] 콜백 처리
  const onSuccess = (rp) => {
    showSnackbar(rp.message, "success")

    // 영상 목록 페이지로 이동
    navigate("/admin/youtube");
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }

  const onFinally = () => { }

  // [3] 실제 삭제 요청 함수
  const removeYoutube = (videoLinkId) => {
    return api.delete(
      `/video-links/${videoLinkId}`,   // ★ 백엔드 DELETE API
      {
        admin: true,
        onSuccess,
        onError,
        onFinally,
      }
    )
  }

  // [4] 훅 반환
  return {
    removeYoutube
  }
}