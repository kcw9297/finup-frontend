import { useEffect, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

export function useNewsList(){
// [1] 필요 데이터 선언
  const [category, setCategory] = useState("date")
  const [news, setNews] = useState([])
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)
  const bottomRef = useRef(null)
  
  const CATEGORY_LIST = [
    { label: "최신뉴스", value: "date" },
    { label: "주요뉴스", value: "sim" }
  ];

// [2] 필요 함수 선언
  //카테고리 변경 함수
  const changeCategory = (newCat) => {
    setCategory(newCat);
    setPage(1);
    setNews([]); //탭 바뀌면 초기화
  }
  const refreshNews = () => {
    setPage(1);
    setNews([]);
  }

// [3] 성공/실패 콜백 함수 정의
  const onSuccess = (items) => {
    setNews(prev => {
      const merged = [...prev, ...items];
      return [...new Map(merged.map(i => [i.link, i])).values()]
    })
  }
  const onError = (err) => {
    console.warn("API가 배열을 반환하지 않습니다", err)
  } 
// [4] REST API 요청 함수 정의
  const fetchNews = async() => {
    if(loading) return;
    setLoading(true);

    try{
      const res = await api.get(`/news/list`,{
        params: {category, page},
        public: true
      })
      console.log("res", res);
      const items = res.data
      onSuccess(items)
    }catch(err){
      onError(err)
      setLoading(true)
      return
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews();
  },[category, page])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading){
        setPage(prev => prev+1)
      }
    })
    if(bottomRef.current)
      observer.observe(bottomRef.current)
    return () => observer.disconnect()
  },[loading])


  // [5] 반환
  return {
    category, setCategory : changeCategory,
    news,
    bottomRef,
    loading,
    CATEGORY_LIST,
    modalOpen, setModalOpen,
    selectedNews, setSelectedNews,
    refreshNews
  }
}
