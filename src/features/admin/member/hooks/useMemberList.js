import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";
import { filter } from "d3";
import { useSearchParams } from "react-router-dom";

// 검색 파라미터 상수
const DEFAULT_ORDER = 'latest'
const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SIZE = 5

/**
 * 회원 리스트 훅
 * @author khj
 * @since 2025-12-04
 */

export function useMemberList() {
  // [1] 필요 데이터 선언
  const [searchRp, setSearchRp] = useState(null) // 검색 결과
  const [loading, setLoading] = useState(true) // 요청 로딩 상태
  const [pagination, setPagination] = useState(null) // 페이징 데이터
  const [memberList, setMemberList] = useState([]) // 리스트 요청 결과 데이터
  const [searchParams, setSearchParams] = useSearchParams() // 검색 파라미터


  // [2] 필요 함수 선언
  const getSearchParams = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || DEFAULT_ORDER,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_PAGE_NUM,
    pageSize: Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
  })
  // 검색 요청 (현재 URL 기반 초기화 필수)
  const [searchRq, setSearchRq] = useState(() => getSearchParams())

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(getSearchParams());

  // 입력 데이터 상태 변경 함수
  const handleChangeRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
  }
  // 스낵바
  const { showSnackbar } = useSnackbar()  // 스낵바 전역 context

  // 페이징 함수
  const handlePage = pageNum => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...getSearchParams(), pageNum };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setLoading(true)
    handleChangeRq(nextRq)  // onChange 옵션이 없는 경우, 수동으로 갱신 필요
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)

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
    const nextRq = { ...getSearchParams(), keyword: searchRq.keyword, filter };
    if (isSameRq(nextRq)) return // 필터 변경 시, 같은 필터거나, 키워드가 없으면 검색 미수행

    // 검색 수행
    setLoading(true)
    handleChangeRq(nextRq)  // 상태 변경
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }

  // 정렬 함수
  const handleOrder = order => {

    // 검증 : 현재 파라미터와 동일한 경우 수행하지 않음
    const nextRq = { ...getSearchParams(), order, pageNum: DEFAULT_PAGE_NUM };
    if (isSameRq(nextRq)) return

    // 페이징 파라미터 갱신
    setLoading(true)
    handleChangeRq(nextRq)  // onChange 옵션이 없는 경우, 수동으로 갱신 필요
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


  // [3] 성공/실패/마지막 콜백 함수
  const onSuccess = (rp) => {
    setMemberList(rp.data ?? [])
    setPagination(rp.pagination ?? null)
  }

  const onError = () => {
    showSnackbar("회원 목록을 불러오지 못했습니다.", "error")
  }

  const onFinally = () => {
    setLoading(false)
  }


  // [4] REST API 요청 함수
  useEffect(() => {
    api.get('/members/list', {
      params: getSearchParams(),
      onSuccess,
      onError,
      onFinally
    })
  }, [searchParams])

  // [5] 검색 조건 변경 시 자동 호출


  return {
    searchRq, loading, memberList,
    setLoading, handleChangeRq, handleSearch, handleFilter, handlePage, handleOrder, pagination,
  }
}
