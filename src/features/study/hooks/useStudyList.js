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
  const [ searchRp, setSearchRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  const [ pageNum, setPageNum ] = useState(DEFAULT_SEARCH_RQ.pageNum) // 정렬 옵션
  const [ isEnd, setIsEnd ] = useState(false)


  // [2] 필요 함수 선언
  // Object 생성 함수 (파라미터로부터 직접 뽑아옴)
  const getSearchParams = () => ({
    order: searchParams.get('order') || DEFAULT_SEARCH_RQ.order,
  })

  // 검색 요청 (페이지는 내부 상태 사용)
  const searchRq = { ...getSearchParams() }

  // 무한 스크롤 함수
  const handleScroll = () => {
    console.log("스크롤 변환 감지");
    
    // 가장 마지막 스크롤이면 더 이상 수행하지 않음
    if (isEnd) return

    // 페이지 1 증가 처리 (리로드 유도)
    setPageNum(prev => prev + 1)
  }

  // 정렬 함수
  const handleOrder = order => {
    
    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...searchRq, order };

    // 페이징 파라미터 갱신
    setPageNum(DEFAULT_SEARCH_RQ.pageNum) // 페이지 초기화
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {

      // 첫 페이지: 기존 데이터 교체
    if (pageNum === DEFAULT_SEARCH_RQ.pageNum) {
      setSearchRp(rp)

      // 추가 페이지: 기존 데이터에 누적
    } else {
      setSearchRp(prev => ({
        ...rp,
        data: [...prev.data, ...rp.data],
        pagination: rp.pagination
      }))
    }

    // 마지막 페이지 판단
    if (rp.pagination.isEndPage) setIsEnd(true)
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
    setLoading(true)
    api.get('/studies/search', { params: searchRq, onSuccess, onError, onFinally })
  }, [pageNum, searchParams])
  

  // [5] 반환
  return {
    searchRq, searchRp, loading,
    handleScroll, handleOrder,
  }
}
