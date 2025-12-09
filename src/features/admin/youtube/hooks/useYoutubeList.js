import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";
import { useAuthStore } from "../../../../base/stores/useAuthStore";


/**
 * 유튜브 영상 리스트 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubeList(searchRq) {
  // [1] 필요 데이터 선언
  const [loading, setLoding] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [youtubeList, setYoutubeList] = useState([])

  const { showSnackbar } = useSnackbar()

  const adminId = useAuthStore(state => state.loginMember?.memberId);

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setYoutubeList(rp.data ?? [])
    setPagination(rp.pagination ?? null)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }
  const onFinally = () => { }

  // [3] URL 수동 조합
  const query = new URLSearchParams({
    ownerId: adminId,
    videoLinkOwner: "STUDY",
    keyword: searchRq.keyword,
    filter: searchRq.filter,
    pageNum: searchRq.pageNum,
    size: searchRq.size,
  }).toString()


  // [4] API 요청 함수 정의
  const fetchYoutubeList = () => {
    api.get(`/video-links`,
      {
        onSuccess, onError, onFinally,
        params: {
          ownerId: adminId,
          videoLinkOwner: "STUDY",
          keyword: searchRq.keyword,
          filter: searchRq.filter,
          pageNum: searchRq.pageNum,
          size: searchRq.size,
        },
        admin: true
      }
    )
  }

  // [5] 목록 자동 호출
  useEffect(() => {
    if (!adminId) return
    fetchYoutubeList()
  }, [adminId, searchRq.pageNum, searchRq.keyword, searchRq.filter])

  // [6] 반환
  return {
    youtubeList,
    pagination,
    loading,

    fetchYoutubeList,
  }
}
