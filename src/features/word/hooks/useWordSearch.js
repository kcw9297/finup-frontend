import { useSearchParams } from "react-router-dom";
import { navigate } from "../../../base/config/globalHookConfig"
import { api } from "../../../base/utils/fetchUtils";
import { useEffect, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { useRecentSearchWordStore } from "../../../base/stores/useRecentSearchWordStore";

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
  
  // Zustand store 추가
  const { load: loadRecentKeywords } = useRecentSearchWordStore();

  // [2] 필요 함수 선언
  const getSearchParams = () => ({
    keyword: searchParams.get("keyword") || "",
  })

  const handleChangeRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }

  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  const handleOrderChange = (order) => {
    setSearchParams({
      ...getSearchParams(),
      order,
      pageNum: 0,
    })
  }

  const handleSearch = e => {
    e?.preventDefault()
    executeSearch()
  }

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

  const validateKeyword = (keyword) => {
    if (!keyword?.trim()) {
      showSnackbar("검색어를 입력해주세요.")
      return false
    }

    const validPattern = /^[a-zA-Z가-힣\s]+$/
    if (!validPattern.test(keyword.trim())) {
      showSnackbar("영문 또는 한글만 입력 가능합니다.")
      return false
    }

    return true
  }

  // 최근 검색어 갱신 함수 추가
  const refreshRecentKeywords = () => {
    api.get("/words/recent-searches", {
      onSuccess: (rp) => {
        loadRecentKeywords(rp.data || []);
      },
      handleError: false,
    });
  };

  // [6] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setWordList(rp.data)
    setPagination(rp.pagination)
    
    // 검색 성공 시 최근 검색어 갱신 (추가!)
    refreshRecentKeywords();
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
  }
}