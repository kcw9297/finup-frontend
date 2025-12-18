import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 범용 뉴스 훅
 * @param {string} fetchUrl - 요청할 API URL (예: "/news/list")
 * @param {object} params - API에 전달할 파라미터 (예: { category, stockName })
 * @param {boolean} isModalOpen - 모달 열림 여부 (열리면 자동 refresh 중단)
 */
export default function useGenericNews(fetchUrl, params = {}, isModalOpen = false){
  const [news, setNews] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [showTop, setShowTop] = useState(false);

  const category = params.category ?? "date";
  const loadingRef = useRef(false);

  const lastRequestRef = useRef(null);

  const fetchNews = useCallback(async () => {
    if (!fetchUrl) return;
    if (loadingRef.current) return; // 중복 방지
    loadingRef.current = true;
    setLoading(true);

    try {
      const reqKey = fetchUrl + JSON.stringify(params);
      lastRequestRef.current = reqKey;

      const res = await api.get(fetchUrl, {
        params: { ...params },
        public: true,
      });

      // 최신 요청만 반영
      if (lastRequestRef.current === reqKey) {
        setNews(res.data);
      }
    } catch (err) {
      console.error("[News] fetch error:", err);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, [fetchUrl, params.category, params.stockName]);

  useEffect(() => {
    fetchNews();
    setVisibleCount(10);
  }, [fetchNews]);

  useEffect(() => {
    if (isModalOpen) return;
  }, [isModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingRef.current &&
          visibleCount < news.length
        ) {
          setVisibleCount((prev) => prev + 10);
        }
      },
      { threshold: 1 }
    );
    const target = document.querySelector("#bottom-observer");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, [visibleCount, news]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const refreshNews = async () => {
    await fetchNews();
  };

  return {
    news,
    loading,
    visibleCount,
    setVisibleCount,
    showTop,
    scrollToTop,
    refreshNews,
  };
}