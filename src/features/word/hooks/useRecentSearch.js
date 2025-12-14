import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 단어장 홈 화면 최근 검색어 훅
 * @author khj
 * @since 2025-12-14
 */

// 일부러 성공/실패/마지막 콜백 함수 안만듦(판단 여부가 필요없어 보여서)

export function useRecentSearch() {

  // [1] 필요 함수/변수 선언

  const [recentKeywords, setRecentKeywords] = useState([]);
  const [loading, setLoading] = useState(false);

  // [2] REST API 호출
  const fetchRecent = () => {
    setLoading(true);
    api.get("/words/recent-searches", {
      onSuccess: (rp) => {
        setRecentKeywords(rp.data || []);
      },
      onFinally: () => setLoading(false),
    });
  };

  const removeRecentWord = (keyword) => {
    api.delete(`/words/recent-searches/${encodeURIComponent(keyword)}`, {
      onSuccess: () => {
        console.log("delete success")
        setRecentKeywords(prev =>
          prev.filter(item => item !== keyword)
        )
      },
    })
  }

  // [3] 홈 진입 시 1회 호출
  useEffect(() => {
    fetchRecent();
  }, []);

  // [4] 반환
  return {
    recentKeywords,
    loading,
    refresh: fetchRecent,
    removeRecentWord,
  };
}
