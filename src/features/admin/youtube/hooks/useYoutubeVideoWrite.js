import { useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { api } from "../../../../base/utils/fetchUtils";
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

  // [2] 입력 상태 변경 함수, 유튜브 videoId 추출 함수
  const changeYoutubeWriteRq = (rq) => {
    setYoutubeWriteRq((prev) => ({ ...prev, ...rq }))
  }


  function extractYoutubeVideoId(url) {
    if (!url) return null;

    const clean = url.trim();

    try {
      // 1) youtu.be 단축 URL
      const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
      if (shortMatch) return shortMatch[1];

      // 2) youtube.com/watch?v=
      const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
      if (watchMatch) return watchMatch[1];

      // 3) embed URL
      const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];

      return null;
    } catch {
      return null;
    }
  }

  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setYoutubeWriteRp(rp)
    showSnackbar(rp.message, "success")

    setTimeout(() => {
      navigate("/admin/youtube")
    }, 300)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }

  const onFinally = () => { }

  // [4] API 요청 함수 정의
  const handleYoutubeRegister = (rq) => {

    if (!adminId) {
      showSnackbar(rq.message, "error");
      return;
    }
    const videoId = extractYoutubeVideoId(youtubeWriteRq.videoUrl);
    if (!videoId) {
      showSnackbar(rq.message, "error");
      return;
    }

    const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const body = {
      videoUrl: normalizedUrl,
      ownerId: adminId,
      videoLinkOwner: "STUDY",
    };


    api.post(
      "/video-links",
      {
        onSuccess, onError, onFinally,
        admin: true,
      },
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