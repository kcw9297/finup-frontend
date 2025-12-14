import { useSearchParams } from "react-router-dom";
import { navigate, showSnackbar } from "../../../base/config/globalHookConfig"
import { api } from "../../../base/utils/fetchUtils";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../base/stores/useAuthStore";

/**
 * 단어장 검색 훅
 * @author khj
 * @since 2025-12-13
 */

const INITIAL_SEARCH_RQ = {
  keyword: "",
  pageNum: 0,
  pageSize: 10,
  filter: "",
  order: "name_asc",
};

export function useWordSearch() {
  // [1] 필요 데이터 선언
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)
  const [wordList, setWordList] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)


  const { isLogin } = useAuthStore()
  const [recent, setRecent] = useState([])

  // [2] 필요 함수 선언
  // URL → 검색 조건 파싱
  const getSearchParams = () => ({
    keyword: searchParams.get("keyword") || "",
    pageNum: Number(searchParams.get("pageNum") ?? 0),
    pageSize: Number(searchParams.get("pageSize") ?? 10),
    filter: searchParams.get("filter") || "name",
    order: searchParams.get("order") || "name_asc",
  })

  // 검색 조건 변경
  const handleChangeRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }

  // 엔터키 입력
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  // 정렬 변경 (즉시 검색)
  const handleOrderChange = (order) => {
    setSearchParams({
      ...getSearchParams(),
      order,
      pageNum: 0, // 정렬 변경 시 페이지 초기화
    })
  }

  // 검색 실행
  const handleSearch = e => {
    e?.preventDefault()
    executeSearch()
  }


  // 실제 검색 실행
  const executeSearch = () => {
    const keyword = searchRq.keyword?.trim()
    if (!keyword) return

    const params = new URLSearchParams({
      keyword,
      pageNum: 0,
      pageSize: searchRq.pageSize,
      filter: searchRq.filter || "name",
      order: searchRq.order,
    })

    navigate({
      pathname: "/words/search",
      search: `?${params.toString()}`
    })
  }


  // 페이지 이동
  const handlePage = page => {
    setLoading(true);
    setSearchParams({
      ...getSearchParams(),
      pageNum: page - 1
    })
  }

  // 최근 검색어(로그인 시)
  const fetchRecent = () => {
    console.log('fetchRecent called, isLogin=', isLogin)

    api.get('/words/recent-searches', {
      onSuccess: rp => setRecent(rp.data)
    })
  }


  // [6] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setWordList(rp.data)
    setPagination(rp.pagination)
  }

  const onError = rp => {
    showSnackbar(rp.message || "검색 중 오류가 발생했습니다.")
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [4] REST API 요청 (URL 변경 감지 → 검색 실행)
  useEffect(() => {
    const params = getSearchParams();
    setSearchRq(params);

    setLoading(true);
    api.get("/words/search", {
      params,
      onSuccess,
      onError,
      onFinally,
    });
  }, [searchParams])

  // [5] 반환
  return {
    searchRq,
    wordList,
    pagination,
    loading,

    handleChangeRq,
    handleSearch,
    handlePage,
    handleSearchEnter,
    handleOrderChange,

    recent,
    fetchRecent,
  }
}