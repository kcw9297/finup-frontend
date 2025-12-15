import { useState, useMemo } from "react";
import useGenericNews from "../../news/hooks/useGenericNews";

export function useKeywordNews () {
  const params = useMemo(() => ({ category: "date" }), []);

  const { news = [], loading } = useGenericNews("/news/list", params,false);

  const newsList = useMemo(() => news.slice(0, 10), [news]);

  const [showPositive, setShowPositive] = useState(true);
  const [showNegative, setShowNegative] = useState(true);

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
      sentiment: "positive",
      color: "#3182F6",
    }));
  }, [newsList]);

  const filteredKeywords = useMemo(() => {
    return originalKeywords.filter(k => {
      if (k.sentiment === "positive" && !showPositive) return false;
      if (k.sentiment === "negative" && !showNegative) return false;
      return true;
    });
  }, [originalKeywords, showPositive, showNegative]);

  return {
    newsList,
    loading,
    originalKeywords,
    filteredKeywords,
    showPositive,
    showNegative,
    setShowPositive,
    setShowNegative,
  };
}