import { useEffect, useState } from "react";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import { api } from "../../../base/utils/fetchUtils";

const INITIAL_SEARCH_RQ = {
  keyword: "",
  pageNum: 1,
  size: 10
}

export function useNoticeSummary() {
  // [1] 필요 데이터 선언
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ)  // 검색 리퀘스트 데이터
  const [noticeList, setNoticeList] = useState([])  // 공지사항 리스트 요청 결과 데이터
  const [pagination, setPagination] = useState(null)  // 페이징 데이터
  const [loading, setLoading] = useState(false)  // 로딩 데이터

  const { showSnackbar } = useSnackbar()  // 스낵바 전역 context

  // [2] 필요 함수 선언

  const changeSearchRq = rq =>
    setSearchRq(prev => ({ ...prev, ...rq }))

  // [3] 성공/실패 콜백
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

  // [4] REST API 요청 함수
  const fetchNoticeSummary = () => {
    setLoading(true)

    console.log("요청 params:", searchRq)

    api.get(
      '/notices',
      {
        onSuccess, onError, onFinally,
        admin: true,
        params: searchRq
      })
  }

  // [5] 검색 조건 변경 시 자동 호출
  useEffect(() => {
    (async () => {
      await fetchNoticeSummary();
    })()
  }, [searchRq.keyword, searchRq.pageNum])

  return {
    searchRq,
    noticeList,
    pagination,
    loading,

    changeSearchRq,
    fetchNoticeSummary
  }
}