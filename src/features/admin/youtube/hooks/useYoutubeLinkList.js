import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";
import { useAuthStore } from "../../../../base/stores/useAuthStore";


/**
 * 유튜브 영상 리스트 훅
 * @since 2025-12-10
 * @author khj
 */

export function useYoutubeLinkList(searchRq) {

  // [1] 필요 데이터 선언(상태)
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState(null)
  const [videoList, setVideoList] = useState([])

  const { showSnackbar } = useSnackbar()

  const adminId = useAuthStore(state => state.loginMember?.memberId);

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setVideoList(rp.data ?? [])
    setPagination(rp.pagination ?? null)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }
  const onFinally = () => {
    setLoading(false)
  }

  // [3] API 요청 함수 정의
  const fetchVideoList = () => {
    api.get(`/video-links/recommend/home`,
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
      }
    )
  }

  // [5] 목록 자동 호출
  useEffect(() => {
    fetchVideoList()
  }, [adminId, searchRq.pageNum, searchRq.keyword, searchRq.filter])

  // [6] 반환
  return {
    videoList,
    pagination,
    loading,

    fetchVideoList,
  }
}
