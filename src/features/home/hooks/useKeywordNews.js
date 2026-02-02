import { useState, useEffect, useMemo, useRef } from "react";
import { api } from "../../../base/utils/fetchUtils";

// 개념 키워드 + 뉴스 미리보기

export function useKeywordNews() {
  // 최신 뉴스 조회
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchLatestNews = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          "/news/main",
          { public: true, params: { pageNum: 1, pageSize: 30 } }
        );
        if (res?.success) {
          setNewsList(res.data ?? []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // 뉴스에 포함된 키워드 집계
  const originalKeywords = useMemo(() => {
    if (!newsList || newsList.length === 0) return [];

    const counter = new Map();

    newsList.forEach((article) => {
      article?.ai?.keywords?.forEach((k) => {
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