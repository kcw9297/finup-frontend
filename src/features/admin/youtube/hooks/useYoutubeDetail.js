import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../../base/utils/fetchUtils";
import { useAuthStore } from "../../../../base/stores/useAuthStore";

const INITIAL_YOUTUBE_DETAIL_RQ = {
  videoUrl: "",
  title: "",
  content: "",
  thumbnailUrl: ""
};

/**
 * 유튜브 영상 수정 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubeDetail() {
  // [1] 필요 데이터 선언
  // [1] 필요 데이터 선언
  const [youtubeDetailRq, setYoutubeDetailRq] = useState(INITIAL_YOUTUBE_DETAIL_RQ);
  const [youtubeDetailRp, setYoutubeDetailRp] = useState(null);

  const adminId = useAuthStore(state => state.loginMember?.memberId ?? null);
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { videoLinkId } = useParams(); // /admin/youtube/edit/:videoId



  // [2] 입력 상태 변경 함수, 유튜브 videoId 추출 함수
  const changeYoutubeDetailRq = (rq) => {
    setYoutubeDetailRq((prev) => ({ ...prev, ...rq }))
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
    setYoutubeDetailRp(rp.data)

    // 상세 조회 값 → 상태에 채우기
    changeYoutubeDetailRq({
      videoUrl: rp.data.videoUrl,
      title: rp.data.title,
      content: rp.data.content,
      thumbnailUrl: rp.data.thumbnailUrl
    })

    setTimeout(() => {
      navigate("/admin/youtube")
    }, 300)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }

  const onFinally = () => { }


  // [5] 영상 상세 조회 함수
  const loadYoutubeDetail = () => {
    api.get(
      `/video-links/${videoLinkId}`,
      {
        admin: true,
      }
    )
  }

  // [6] 수정 API 요청 함수 정의
  const handleYoutubeEdit = (rq) => {

    if (!adminId) {
      showSnackbar(rq.message, "error");
      return;
    }

    const videoId = extractYoutubeVideoId(youtubeDetailRq.videoUrl);
    if (!videoId) {
      showSnackbar(rq.message, "error");
      return;
    }

    const normalizedUrl = `https://www.youtube.com/watch?v=${videoId}`;

    const body = {
      videoLinkId: Number(videoLinkId),
      videoUrl: normalizedUrl,
      videoId: videoId
    };


    api.put(
      `/video-links/${videoLinkId}`,
      {
        onSuccess, onError, onFinally,
        admin: true,
      },
      body
    )
  }

  // [7] 첫 렌더링 시 상세 조회
  useEffect(() => {
    loadYoutubeDetail();
  }, [videoLinkId]);

  // [5] 반환
  return {
    youtubeDetailRq,
    youtubeDetailRp,
    changeYoutubeDetailRq,
    handleYoutubeEdit
  }
}