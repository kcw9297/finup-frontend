import { useSearchParams } from "react-router-dom";
import { showSnackbar } from "../../../base/config/globalHookConfig"
import { api } from "../../../base/utils/fetchUtils";
import { useEffect, useState } from "react";


const INITIAL_SEARCH_RQ = {
  keyword: "",
  pageNum: 1,
  pageSize: 10,
};

export function useWordSearch() {
  // [1] 필요 데이터 선언
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)
  const [wordList, setWordList] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)

  // [2] 필요 함수 선언
  // URL → 검색 조건 파싱
  const getSearchParams = () => ({
    keyword: searchParams.get("keyword") || "",
    pageNum: Number(searchParams.get("pageNum")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  })

  // 검색 조건 변경
  const handleChangeRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }


  // 검색 실행
  const handleSearch = e => {
    e?.preventDefault();
    setLoading(true);
    setSearchParams({ ...searchRq, pageNum: 1 });
  };

  // 페이지 이동
  const handlePage = pageNum => {
    setLoading(true);
    setSearchParams({ ...getSearchParams(), pageNum });
  };


  // [6] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setWordList(rp.data)
    setPagination(rp.Pagination)
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
  }, [searchParams]);

  // [5] 반환
  return {
    searchRq,
    wordList,
    pagination,
    loading,
    handleChangeRq,
    handleSearch,
    handlePage,
  }
}