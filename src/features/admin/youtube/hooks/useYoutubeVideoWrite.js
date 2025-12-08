import { useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../base/utils/fetchUtils";
import { navigate } from './../../../../base/config/globalHookConfig';
import { useAuthStore } from "../../../../base/stores/useAuthStore";

const INITIAL_YOUTUBE_WRITE_RQ = {
  videoUrl: "",
  title: "",
  content: "",
}

/**
 * 유튜브 영상 등록 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubeVideoWrite() {
  // [1] 필요 데이터 선언
  const [youtubeWriteRq, setYoutubeWriteRq] = useState(INITIAL_YOUTUBE_WRITE_RQ)
  const [youtubeWriteRp, setYoutubeWriteRp] = useState(null)
  const adminId = useAuthStore(state => state.loginMember?.memberId ?? null);


  const { showSnackbar } = useSnackbar()
  const navigate = useNavigate()

  // [2] 입력 상태 변경 함수
  const changeYoutubeWriteRq = (rq) => {
    setYoutubeWriteRq((prev) => ({ ...prev, ...rq }))
  }
  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setYoutubeWriteRp(rp)
    showSnackbar("유튜브 영상을 등록했습니다.", "success")

    setTimeout(() => {
      navigate("/admin/youtube")
    }, 300)
  }

  const onError = () => {
    showSnackbar("유튜브 영상 등록에 실패했습니다.", "error")
  }

  const onFinally = () => { }

  // [4] API 요청 함수 정의
  const handleYoutubeRegister = () => {

    if (!adminId) {
      showSnackbar("로그인 정보가 없습니다.", "error");
      return;
    }
    setYoutubeWriteRp(null)

    const body = {
      videoUrl: youtubeWriteRq.videoUrl,
      ownerId: adminId,
      videoLinkOwner: "HOME",
    };


    api.post(
      "/video-links",
      { onSuccess, onError, onFinally, admin: true },
      body
    )
  }

  // [5] 반환
  return {
    youtubeWriteRq, youtubeWriteRp,
    changeYoutubeWriteRq,
    handleYoutubeRegister
  }
}