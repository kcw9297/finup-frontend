import { useEffect, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";
import { useSearchParams } from "react-router-dom";
import { useReloadStore } from "../../../base/stores/useReloadStore";


const INITIAL_SEARCH_RQ = {
  keyword: "",
  filter: "",
  pageNum: 1,
  size: 10
}

// 검색 파라미터 상수
const DEFAULT_ORDER = 'latest'
const DEFAULT_PAGE_NUM = 1
const DEFAULT_PAGE_SIZE = 5
/**
 * 공지사항 리스트 훅
 * @author khj
 * @since 2025-12-01
 */
export function useNoticeList() {
  // [1] 필요 데이터 선언
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)  // 검색 리퀘스트 데이터
  const [noticeList, setNoticeList] = useState([])  // 공지사항 리스트 요청 결과 데이터
  const [pagination, setPagination] = useState(null)  // 페이징 데이터
  const [loading, setLoading] = useState(false)  // 로딩 데이터
  const [searchParams, setSearchParams] = useSearchParams() // 검색 파라미터
  const { reloading } = useReloadStore() // 리로딩 감지

  const { showSnackbar } = useSnackbar()

  // [2] 필요 함수 선언
  // 스낵바 전역 context

  const getSearchParams = () => ({
    filter: searchParams.get('filter') || '',
    keyword: searchParams.get('keyword') || '',
    order: searchParams.get('order') || DEFAULT_ORDER,
    pageNum: Number(searchParams.get('pageNum')) || DEFAULT_PAGE_NUM,
    pageSize: Number(searchParams.get('pageSize')) || DEFAULT_PAGE_SIZE,
  })

  const changeSearchRq = rq =>
    setSearchRq(prev => ({ ...prev, ...rq }))

  // 입력 데이터 상태 변경 함수
  const handleChangeRq = rq => {
    setSearchRq(prev => ({ ...prev, ...rq }))
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

  // 파라미터 일치 여부 비교 함수
  const isSameRq = (rq) => JSON.stringify(rq) === JSON.stringify(getSearchParams());
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

  // [3] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setNoticeList(rp.data)
    setPagination(rp.pagination)
  }

  const onError = (rp) => {
    showSnackbar("공지사항을 불러오지 못했습니다.", "error")
  }

  const onFinally = () => {
    setLoading(false)
  }

  useEffect(() => {
    api.get('/notices', {
      admin: true,
      params: getSearchParams(), onSuccess, onError, onFinally,
    })
  }, [searchParams])

  return {
    searchRq,
    noticeList,
    pagination,
    loading,

    handleChangeRq,
    handleSearch,
    handleFilter,
    handlePage,
    handleOrder
  }
}