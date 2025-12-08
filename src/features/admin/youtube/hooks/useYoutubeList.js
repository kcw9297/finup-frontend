import { useEffect, useState } from "react";
import { useSnackbar } from "../../../../base/provider/SnackbarProvider";
import { api } from "../../../../base/utils/fetchUtils";


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

  // [2] 성공/실패/마지막 콜백 정의
  const onSuccess = (rp) => {
    setYoutubeList(rp.data)
    setPagination(rp.pagination)
  }

  const onError = () => {
    showSnackbar("유튜브 영상 리스트를 불러오는 데 실패했습니다.", "error")
  }
  const onFinally = () => { }

  // [3] API 요청 함수 정의
  const fetchYoutubeList = () => {
    api.get("/video-links",
      {
        onSuccess, onError, onFinally,
        params: searchRq,
        admin: true
      }
    )
  }

  // [5] 반환
  return {
    youtubeList,
    pagination,
    loading,

    fetchYoutubeList,
  }
}
