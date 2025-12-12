import { useState } from "react";
import { api } from "../../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";

/**
 * 유튜브 URL 기반 영상 정보 미리보기 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubePreview() {
  // [1] 필요 데이터 선언
  const [previewRq, setPreviewRq] = useState({ videoUrl: "" })
  const [previewRp, setPreviewRp] = useState(null)
  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar()

  // [2] 입력 상태 변경
  const changePreviewRq = (rq) => {
    setPreviewRq((prev) => ({ ...prev, ...rq }))
  }

  // [3] 성공/실패/마지막 콜백
  const onSuccess = (rp) => {
    setPreviewRp(rp.data)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
    setPreviewRp(null)
  }

  const onFinally = () => setLoading(false)


  // [4] 프리뷰 호출 함수
  const loadPreview = () => {
    if (!previewRq.videoUrl) return

    setLoading(true)
    setPreviewRp(null)

    api.post(
      `/videos`,
      { onSuccess, onError, onFinally, admin: true },
      { videoUrl: previewRq.videoUrl.trim() }
    )
  }

  // [5] 반환
  return {
    previewRq, previewRp, loading,
    changePreviewRq,
    loadPreview,
  }
}