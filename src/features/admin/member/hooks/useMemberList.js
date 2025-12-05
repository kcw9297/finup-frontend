import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";

const INITIAL_SEARCH_RQ = {
  keyword: "",
  pageNum: 1,
  size: 10
}

/**
 * 회원 리스트 훅
 * @author khj
 * @since 2025-12-04
 */

export function useMemberList() {
  // [1] 필요 데이터 선언
  const [searchRq, setSearchRq] = useState(INITIAL_SEARCH_RQ) // 검색 응답 데이터
  const [loading, setLoding] = useState(true) // 요청 로딩 상태
  const [pagination, setPagination] = useState(null) // 페이징 데이터
  const [memberList, setMemberList] = useState([]) // 리스트 요청 결과 데이터

  // [2] 필요 함수 선언
  const { showSnackbar } = useSnackbar()  // 스낵바 전역 context

  const changeSearchRq = rq =>
    setSearchRq(prev => ({ ...prev, ...rq }))

  // [3] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setMemberList(rp.data)
    setPagination(rp.pagination)
  }

  const onError = (rp) => {
    showSnackbar("회원 목록을 불러오지 못했습니다.", "error")
  }

  const onFinally = () => {
    setLoding(false)
  }


  // [4] REST API 요청 함수
  const fetchMemberList = () => {
    setLoding(true)

    api.get(
      '/members',
      {
        onSuccess, onError, onFinally,
        admin: true,
        params: searchRq
      })
  }


  // [5] 검색 조건 변경 시 자동 호출

  useEffect(() => {
    (async () => {
      await fetchMemberList()
    })()
  }, [searchRq.keyword, searchRq.pageNum])

  return (
    searchRq,
    memberList,
    pagination,
    loading,

    changeSearchRq,
    fetchMemberList
  )
}
