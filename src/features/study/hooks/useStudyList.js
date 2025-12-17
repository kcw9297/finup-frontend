import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSearchParams } from "react-router-dom";
import { DEFAULT_SEARCH_RQ } from "../constants/studyConstant";


/**
 * 단계별 학습 리스트 훅
 * @since 2025-12-13
 * @author kcw
 */

export function useStudyList() {

  // [1] 필요 데이터 선언
  const [searchRp, setSearchRp] = useState(null) // 검색 결과
  const [loading, setLoading] = useState(true) // 로딩 상태
  const [searchParams, setSearchParams] = useSearchParams() // 검색 파라미터


  // [2] 파라미터 객체
  const searchRq = {
    order: searchParams.get('order') || DEFAULT_SEARCH_RQ.order,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_SEARCH_RQ.pageNum,
  }

  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setSearchRp(rp)  // 성공 시 검색 결과 추출
  }

  const onError = rp => {
    setSearchRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [4] API 요청 함수 정의
  // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용
  useEffect(() => {
    // 최초 진입 시 URL 보정 
    if (!searchParams.get('pageNum') || !searchParams.get('order')) {
      setSearchParams(searchRq)
      return
    }

    setLoading(true)
    api.get('/studies/search',
      { params: searchRq, onSuccess, onError, onFinally })
  }, [searchParams])


  // [5] 정렬 함수, 핸들러
  const handleOrder = order => {

    setSearchParams({
      order,
      pageNum: DEFAULT_SEARCH_RQ.pageNum,
    })
  }

  const handlePageChange = (nextPage) => {
    setSearchParams({
      ...searchRq,
      pageNum: nextPage,
    })
  }

  // [5] 페이징 보정 effect
  useEffect(() => {
    if (!searchRp?.pagination) return

    const { totalPage } = searchRp.pagination

    if (searchRq.pageNum > totalPage && totalPage > 0) {
      setSearchParams({
        ...searchRq,
        pageNum: totalPage,
      })
    }
  }, [searchRp])

  // [6] 반환
  return {
    searchRq, searchRp, loading,
    handleOrder, handlePageChange,
  }
}
