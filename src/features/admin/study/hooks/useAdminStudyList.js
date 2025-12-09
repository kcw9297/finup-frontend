import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";
import { useAuthStore } from "../../../../base/stores/useAuthStore";
import { useSearchParams } from "react-router-dom";
import { useReloadStore } from "../../../../base/stores/useReloadStore";



// 검색 파라미터 상수
const DEFAULT_ORDER = 'latest'
const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SIZE = 5

/**
 * 단계별 학습 리스트 훅
 * @since 2025-12-08
 * @author kcw
 */

export function useAdminStudyList() {

  // [1] 필요 데이터 선언
  const [ searchRp, setSearchRp ] = useState(null) // 검색 결과
  const [ loading, setLoading ] = useState(true) // 로딩 상태
  const [ searchParams, setSearchParams ] = useSearchParams() // 검색 파라미터
  const { reloading } = useReloadStore() // 리로딩 감지
  const { showSnackbar } = useSnackbar()
  
  
  // [2] 필요 함수 선언 
  // Object 생성 함수 (파라미터로부터 직접 뽑아옴)
  const getSearchParams = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || DEFAULT_ORDER,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_PAGE_NUM,
    pageSize: Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
  })
  
  // 검색 요청 (현재 URL 기반 초기화 필수)
  const [ searchRq, setSearchRq ] = useState(() => getSearchParams())

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(getSearchParams());

  // 입력 데이터 상태 변경 함수
  const handleChangeRq = rq => {
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
    const nextRq = { ...getSearchParams(), keyword: searchRq.keyword, filter };
    if (isSameRq(nextRq)) return // 필터 변경 시, 같은 필터거나, 키워드가 없으면 검색 미수행
    
    // 검색 수행
    setLoading(true)
    handleChangeRq(nextRq)  // 상태 변경
    setSearchParams(nextRq) // 새로운 파라미터 삽입 (URL 변경 유도)
  }


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

  // [3] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setSearchRp(rp)
  }

  const onError = rp => {
    setSearchRp(null) // 검색 결과 제거
  }

  const onFinally = () => {
    setLoading(false) // 로딩 상태 해제
  }

  // [4] API 요청 함수 정의
  useEffect(() => { // 검색의 경우, 페이지 입장 시 초기 값이 필요하므로, useEffect 사용
    api.get('/studies/search', { params: getSearchParams(), onSuccess, onError, onFinally, admin: true })
  }, [searchParams, reloading])
  

  // [6] 반환
  return {
    searchRq, searchRp, loading,
    setLoading, handleChangeRq, handleSearch, handleFilter, handlePage, handleOrder
  }
}
