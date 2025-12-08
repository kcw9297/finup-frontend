import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useStocksNews(isModalOpen){
  const [category, setCategory] = useState("date");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showTop, setShowTop] = useState(false);
  const lastRequestRef = useRef(0);
  const CATEGORY_LIST = [
    { label: "최신뉴스", value: "date" },
    { label: "주요뉴스", value: "sim" },
  ];
  const stockName = "삼성전자";

  // 카테고리 변경 함수
  const changeCategory = (newCat) => {
    setCategory(newCat);
  };

  const fetchNews = useCallback(async () => {
    const requestId = Date.now();
    lastRequestRef.current = requestId;

    setLoading(true);
    try {
      const res = await api.get("/stocks/news", {
        params: { category, stockName},//종목명도 받아야됨
        public: true,
      });
      if (lastRequestRef.current != requestId) {
        return;
      }
      setNews(res.data);
    } catch (err) {
      console.error("뉴스 불러오기 오류:", err);
    } finally {
      if (lastRequestRef.current === requestId) {
        setLoading(false);
      }
    }
  }, [category]);

  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const intervalRef = useRef(null);

  //무한 스크롤처럼
  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => Math.min(prev + 10, news.length));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [news]);

  // 카테고리 바뀔 때 1번만 API 호출
  useEffect(() => {
    fetchNews();
  }, [category]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isModalOpen) {
        fetchNews();
        console.log("자동 새로고침 실행됨");
      } else {
        console.log("새로고침 중단");
      }
    }, 15 * 60 * 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [isModalOpen, category]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 300) setShowTop(true);
      else setShowTop(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  return {
    category,
    setCategory: changeCategory,
    news,
    loading,
    visibleCount,
    CATEGORY_LIST,
    showTop,
    MoveToTop,
    refreshNews: fetchNews,
  };
}