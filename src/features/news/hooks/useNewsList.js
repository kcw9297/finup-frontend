import { useState, useEffect } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useNewsList() {
  const [category, setCategory] = useState("date");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [showTop, setShowTop] = useState(false);

  const CATEGORY_LIST = [
    { label: "최신뉴스", value: "date" },
    { label: "주요뉴스", value: "sim" }
  ];

  // 카테고리 변경 함수
  const changeCategory = (newCat) => {
    setCategory(newCat)
  };

  const MoveToTop = () =>{
    window.scrollTo({top:0, behavior:'smooth'})
  }

 //무한 스크롤처럼
  useEffect(() => {
  const onScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
      setVisibleCount(prev => Math.min(prev + 10, news.length))
    }
  };
  window.addEventListener("scroll", onScroll)
  return () => window.removeEventListener("scroll", onScroll)
}, [news]);

  // 카테고리 바뀔 때 1번만 API 호출
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      try {
        const res = await api.get("/news/list", {
          params: { category },
          public: true
        })
        setNews(res.data)
      } catch (err) {
        console.error("뉴스 불러오기 오류:", err)
      } finally {
        setLoading(false)
      }
    };

    fetchNews()
  }, [category])
  
  useEffect(() => {
    const onScroll = () => {
      if(window.scrollY > 300) setShowTop(true)
      else setShowTop(false)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  })

  return {
    category,
    setCategory: changeCategory,
    news,
    loading,
    visibleCount,
    CATEGORY_LIST,
    showTop,
    MoveToTop
  };
}
