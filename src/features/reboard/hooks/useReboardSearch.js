import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../base/utils/fetchUtils";

// 검색 파라미터 상수
const DEFAULT_ORDER = 'latest'
const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SIZE = 5

// 초기 요청 상태 값
const INITIAL_SEARCH_RQ = {
  filter: '', keyword: '', order: DEFAULT_ORDER, pageNum: DEFAULT_PAGE_NUM, pageSize: DEFAULT_PAGE_SIZE
}

/**
 * 게시판 검색 (예시)
 * @author kcw
 * @since 2025-11-29
 */
export function useReboardSearch() {
  
  // [1] 필요 데이터 선언
  const [ searchRp, setSearchRp ] = useState(null) // 검색 응답
  const [ loading, setLoading ] = useState(true) // 검색 로딩 상태
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터


  // [2] 필요 함수 선언
  // Object 생성 함수 (파라미터로부터 직접 뽑아옴)
  const getSearchRq = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || DEFAULT_ORDER,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_PAGE_NUM,
    pageSize: Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
  })
  
  // 검색 요청 (현재 URL 기반 초기화 필수)
  const [ searchRq, setSearchRq ] = useState(() => getSearchRq())

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(getSearchRq());

  // 입력 데이터 상태 변경 함수
  const updateSearchRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }

  // 검색 버튼 함수
  const handleSearch = e => {

    // 제출 이벤트 방지
    e.preventDefault()

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    if (isSameRq(searchRq)) return

    // 검색 수행
    setLoading(true)
    setSearchParams(searchRq)
  }

  // 필터링 함수
  const handleFilter = filter => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...getSearchRq(), filter };
    if (isSameRq(nextRq)) return

    // 검색 수행
    setLoading(true)
    updateSearchRq(nextRq)  // 필터가 변경되는 즉시 반영하려면, 추가해야 함
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }

  // 페이징 함수
  const handlePage = pageNum => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...getSearchRq(), pageNum };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setLoading(true)
    updateSearchRq(nextRq)  // onChange 옵션이 없는 경우, 수동으로 갱신 필요
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }

  const handleOrder = order => {
    
    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...getSearchRq(), order, pageNum: DEFAULT_PAGE_NUM };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setLoading(true)
    updateSearchRq(nextRq)  // onChange 옵션이 없는 경우, 수동으로 갱신 필요
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


  // [3] 성공/실패 콜백 함수 정의
  const onSuccess = rp => {
    setSearchRp(rp)
  }

  const onError = rp => {

  }

  const onFinally = () => {
    console.log("검색 요청", searchRq)
    setLoading(false) // 로딩 상태 해제
  }


  // [4] REST API 요청 함수 정의
  useEffect(() => { // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용
    api.get('/reboards/search', { params: getSearchRq(), onSuccess, onFinally, public: true })
  }, [searchParams])
  

  // [5] 반환
  return {
    searchRq, searchRp, loading,
    setLoading, updateSearchRq, handleSearch, handleFilter, handlePage, handleOrder
  }
}