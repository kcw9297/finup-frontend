import { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 개념 학습 추천 용어 hook
 * @since 2025-12-18
 * @author khj
 */
export function useRecommendWordHook() {

  // [1] 파라미터
  const { studyId } = useParams();

  // [2] 상태
  const [recommendRp, setRecommendRp] = useState([]); // 추천 결과
  const [loading, setLoading] = useState(false);        // 로딩 상태

  // [3] 공통 API 호출
  const fetchRecommend = (retry) => {
    if (!studyId) return;

    setLoading(true);

    api.get(
      "/study-words/recommend",   // ⚠️ 단어 추천 API 경로
      {
        params: {
          studyId: Number(studyId),
          retry: retry,
        },
        onSuccess: (rp) => {
          setRecommendRp(Array.isArray(rp.data) ? rp.data : [])
        },
        onFinally: () => {
          setLoading(false);
        },
      }
    );
  };

  // [4] 최초 추천
  const recommend = () => {
    fetchRecommend(false);
  };

  // [5] 재추천
  const retryRecommend = () => {
    fetchRecommend(true);
  };

  // [6] 반환
  return {
    recommendRp,
    recommend,
    retryRecommend,
    loading,
  };
}
