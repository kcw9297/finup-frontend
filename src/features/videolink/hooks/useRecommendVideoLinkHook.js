import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from '../../../base/utils/fetchUtils';
/**
 * 개념 학습 추천 비디오 링크 hook
 * @since 2025-12-18
 * @author khj
 */


export function useRecommendVideoLinkHook() {

  // [1] 파라미터
  const { studyId } = useParams()

  // [2] 상태
  const [recommendRp, setRecommendRp] = useState(null) // 추천 결과
  const [loading, setLoading] = useState(false) // 로딩 상태

  // [3] 공통 API 호출 함수
  const fetchRecommend = (retry) => {
    if (!studyId) return

    setLoading(true)

    api.get(
      "/video-links/recommend/study",

      {
        params: {
          studyId: Number(studyId),
          retry: retry,
        },
        onSuccess: (rp) => {
          setRecommendRp(rp.data)
        },
        onFinally: () => {
          setLoading(false)
        }
      }
    )
  }

  // [4] 최초 추천
  const recommend = () => {
    fetchRecommend(false)
  }

  // [5] 재추천
  const retryRecommend = () => {
    fetchRecommend(true)
  }

  return {
    recommendRp,
    recommend,
    retryRecommend,
    loading,
  }
}