// hooks/useRecentSearch.js
import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useRecentSearchWordStore } from "../../../base/stores/useRecentSearchWordStore";

/**
 * 단어장 홈 화면 최근 검색어 훅
 * @author khj
 * @since 2025-12-14
 */

export function useRecentSearch() {

  // [1] Zustand store 사용
  const { recentKeywords, load, remove } = useRecentSearchWordStore();
  const [loading, setLoading] = useState(false);

  // [2] REST API 호출
  const fetchRecent = () => {
    setLoading(true);
    api.get("/words/recent-searches", {
      onSuccess: (rp) => {
        load(rp.data || []); // Store에 저장
      },
      onFinally: () => setLoading(false),
    });
  };

  const removeRecentWord = (keyword) => {
    api.delete(`/words/recent-searches/${encodeURIComponent(keyword)}`, {
      onSuccess: () => {
        remove(keyword); // Store에서 제거
      },
    });
  };

  // [3] 홈 진입 시 1회 호출
  useEffect(() => {
    // Store가 비어있을 때만 API 호출
    if (recentKeywords.length === 0) {
      fetchRecent();
    }
  }, []);

  // [4] 반환
  return {
    recentKeywords,
    loading,
    refresh: fetchRecent,
    removeRecentWord,
  };
}