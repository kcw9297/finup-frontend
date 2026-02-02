import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

export function useStocksNews(){

  const { code } = useParams(null)
  const [ news, setNews ] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [ loading, setLoading ] = useState(true)
  const [ showTop, setShowTop ] = useState(false)
  const { showSnackbar } = useSnackbar()
  
  const pageRef = useRef(1);  // 페이지 번호 관리
  const loadingRef = useRef(false);
  const lastRequestRef = useRef(null);

// [2] API 요청 함수 정의
  const onSuccess = useCallback((rp, isInitial) => {
    if (isInitial) {
      setNews(rp.data);
    } else {
      setNews(prev => [...prev, ...rp.data]);
    }
    pageRef.current += 1;
    setHasMore(!rp.pagination.isEndPage);
  }, []);

  const onError = useCallback((rp) => {
    //showSnackbar("뉴스를 불러오는데 실패했습니다.");
  }, []);

  const onFinally = useCallback(() => {
    loadingRef.current = false;
    setLoading(false);
  }, []);

  const fetchNews = useCallback(async (isInitial = false) => {
    
    // 뉴스 조회 전 확인
    if (loadingRef.current) return; // 중복 방지
    if (!hasMore && !isInitial) return; // 더 이상 데이터 없으면 중단

    // 로딩 상태
    loadingRef.current = true
    setLoading(true)

    // 페이지 값
    const currentPage = isInitial ? 1 : pageRef.current

    // 요청 키 생성
    const reqKey = `news-${currentPage}-${Date.now()}`;
    lastRequestRef.current = reqKey;

    // 조회 수행
    const res = await api.get("/news/stock", { onFinally, params: { stockCode: code, pageNum: currentPage, pageSize: 30 } });
    
    // 최신 요청만 반영
    if (res.success && lastRequestRef.current === reqKey)
      onSuccess(res, isInitial);
    
    
  }, [hasMore, code]);

  
  // [3] 필요 함수 정의
  // 다음 스크롤로 이동
  const goNext = useCallback(() => {
    if (!hasMore || loadingRef.current) return;
    fetchNews(false);
  }, [fetchNews, hasMore]);

  // [4] 초기화 로직 선언
  useEffect(() => {
    pageRef.current = 1;
    setHasMore(true);
    setNews([]);
    fetchNews(true);
  }, []);


  // [5] 반환
  return {
    news, loading, hasMore, showTop,
    setShowTop, goNext
  };
}