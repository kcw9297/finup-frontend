import { useSearchParams } from "react-router-dom";
import { navigate, showSnackbar } from "../../../base/config/globalHookConfig"
import { api } from "../../../base/utils/fetchUtils";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../../base/stores/useAuthStore";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

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
  const { showSnackbar } = useSnackbar()
  


  const { isLogin } = useAuthStore()
  const [recent, setRecent] = useState([])

  // [2] 필요 함수 선언
  // URL → 검색 조건 파싱
  const getSearchParams = () => ({
    keyword: searchParams.get("keyword") || "",
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
    
    if (!validateKeyword(keyword)) {
      return
    }

    const params = new URLSearchParams({
      keyword,
    })

    navigate({
      pathname: "/words/search",
      search: `?${params.toString()}`
    })
  }


  // 최근 검색어(로그인 시)
  const fetchRecent = () => {
    console.log('fetchRecent called, isLogin=', isLogin)

    api.get('/words/recent-searches', {
      onSuccess: rp => setRecent(rp.data)
    })
  }

  // 검색어 유효성
  const validateKeyword = (keyword) => {
    if (!keyword?.trim()) {
      showSnackbar("검색어를 입력해주세요.")
      return false
    }

    // 영문, 한글, 공백만 허용 (특수문자, 숫자 불허)
    const validPattern = /^[a-zA-Z가-힣\s]+$/
    if (!validPattern.test(keyword.trim())) {
      showSnackbar("영문 또는 한글만 입력 가능합니다.")
      return false
    }

    return true
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
    if (!params.keyword) return;
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
    handleSearchEnter,
    handleOrderChange,

    recent,
    fetchRecent,
  }
}