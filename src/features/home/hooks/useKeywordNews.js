import { useMemo } from "react";
import useGenericNews from "../../news/hooks/useGenericNews";

/**
 * 홈 화면의 "개념 키워드 + 뉴스 미리보기"를 위한 훅
 * - 최신 뉴스 10개 조회
 * - 뉴스에 포함된 AI 키워드를 집계해 워드클라우드용 데이터 생성
 */
export function useKeywordNews () {
  // 홈에서는 항상 최신 뉴스 기준으로 사용
  const params = useMemo(() => ({ category: "date" }), []);

  // 공통 뉴스 API 사용 (뉴스 리스트 페이지와 동일한 데이터 소스)
  const { news = [], loading } = useGenericNews("/news/list", params, false);

  // 홈에 보여줄 뉴스는 최신 10개만 사용
  const newsList = useMemo(() => news.slice(0, 10), [news]);

  // 각 뉴스의 AI 키워드를 모아 빈도수 기준으로 집계 → 워드클라우드에서 크기/색상 결정에 사용
  const originalKeywords = useMemo(() => {
    const counter = new Map();

    newsList.forEach(article => {
      article?.ai?.keywords?.forEach(k => {
        counter.set(k.term, (counter.get(k.term) || 0) + 1);
      });
    });

    return Array.from(counter.entries()).map(([text, value]) => ({
      text,
      value,
    }));
  }, [newsList]);

  return {
    newsList,
    loading,
    originalKeywords,
  };
}