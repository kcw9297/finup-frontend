import { useEffect, useRef, useState } from "react";
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
  const [rows, setRows] = useState([])
  // const bottomRef = useRef(null)
  // const [page, setPage] = useState(DEFAULT_SEARCH_RQ.pageNum)
  // const initializedRef = useRef(false)

  // [2] 검색 조건 (URL 기반)
  const order = searchParams.get('order') || DEFAULT_SEARCH_RQ.order

  // [2] 파라미터 객체
  const searchRq = {
    order: searchParams.get('order') || DEFAULT_SEARCH_RQ.order,
  }

  // // [3] 성공/실패/마지막 콜백 정의
  // const onSuccess = (rp) => {
  //   setRows(rp.data)
  //   // 성공 시 검색 결과 추출
  // }

  // const onError = rp => {
  //   setSearchRp(null) // 검색 결과 제거
  // }

  // const onFinally = () => {
  //   setLoading(false) // 로딩 상태 해제
  // }

  // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용

  // [3] 조회
  useEffect(() => {
    setLoading(true)

    api.get('/studies/search', {
      params: {
        order,
        pageNum: 1,
        pageSize: 1000, // 전체 조회용
      },
      onSuccess: (rp) => {
        setRows(rp.data ?? [])
      },
      onError: () => {
        setRows([])
      },
      onFinally: () => {
        setLoading(false)
      },
    })
  }, [order])



  // [5] 정렬 함수, 핸들러
  const handleOrder = (nextOrder) => {
    if (order === nextOrder) return
    setSearchParams({ order: nextOrder }, { replace: true })
  }


  // const handlePageChange = (nextPage) => {
  //   setSearchParams({
  //     ...searchRq,
  //     pageNum: nextPage,
  //   })
  // }

  // // [5] 페이징 보정 effect (페이징 변경 예비 남겨둠)
  // useEffect(() => {
  //   if (!searchRp?.pagination) return

  //   const { totalPage } = searchRp.pagination

  //   if (searchRq.pageNum > totalPage && totalPage > 0) {
  //     setSearchParams({
  //       ...searchRq,
  //       pageNum: totalPage,
  //     })
  //   }
  // }, [searchRp])

  // // [6] 스크롤 방식
  // useEffect(() => {
  //   if (!bottomRef.current) return
  //   if (!searchRp?.pagination) return
  //   if (page >= searchRp.pagination.totalPage) return

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       // 스크롤 트리거에서는 URL X 페이지만 증가
  //       if (entry.isIntersecting && !loading) {
  //         setPage(prev => prev + 1)
  //       }
  //     },
  //     { threshold: 0.3 }
  //   )

  //   observer.observe(bottomRef.current)

  //   return () => observer.disconnect()
  // }, [page, searchRp, loading])


  // [6] 반환
  return {
    order, loading, rows,
    handleOrder,
  }
}
