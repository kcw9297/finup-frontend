import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";

// 초기 요청 상태 값
const INITIAL_SEARCH_RQ = {
  filter: '', keyword: '', order: 'LATEST', pageNum: 10, pageSize: 5
}

export function useReboardSearch() {
  
  // [1] 필요 데이터 선언
  const [ searchRq, setSearchRq ] = useState(INITIAL_SEARCH_RQ) // 검색 요청
  const [ searchRp, setSearchRp ] = useState(null) // 검색 응답
  const [ loading, setLoading ] = useState(true) // 검색 로딩 상태
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  

  // [2] 필요 함수 선언
  // 입력 데이터 상태 변경 함수
  const updateSearchRq = newData => setSearchRq(prev => ({...prev, ...newData}))

  // 검색 파라미터 추출 함수
  const getSearchRq = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || '',
    pageNum: Number(searchParams.get('pageNum')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || 5,
  })

  // 검색 버튼 함수
  const handleSearch = rq => {
    setLoading(true)
    setSearchRq(rq)
    setSearchParams(rq)
  }

  // 페이징 함수
  const handlePage = pageNum => {
    setLoading(true)
    updateSearchRq({ pageNum }) // 새로은 페이지 삽입
  }

  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
    setSearchRp(rp)
  }

  const onError = rp => {

  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }


  // [4] REST API 요청 함수 정의
  useEffect(() => {
    api.get('/reboards/search', { params: getSearchRq(), onSuccess, onFinally, public: true })
  }, [searchParams])
  
  
  // [5] 반환
  return {
    searchRq, searchRp, loading,
    setLoading, updateSearchRq, handleSearch, handlePage
  }
}