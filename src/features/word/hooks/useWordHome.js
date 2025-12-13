import { useEffect, useState } from "react";
import { api } from "../../../base/utils/fetchUtils";
import { useSnackbar } from "../../../base/provider/SnackbarProvider";
import Loading from './../../../base/components/layout/Loading';


/**
 * 단어장 홈 정보 훅
 * @author khj
 * @since 2025-12-10
 */

export function useWordHome() {
  // [1] 필요 데이터 선언

  const [homeData, setHomeData] = useState(null)
  const [loading, setLoading] = useState(true)

  const { showSnackbar } = useSnackbar()

  

  // [2] 필요 함수 선언
  const clearHomeData = () => setHomeData(null)

  // [3] 성공/실패/마지막 콜백 함수
  const onSuccess = rp => {
    setHomeData(rp.data)
  }

  const onError = (rp) => {
    showSnackbar(rp.message, "error")
  }

  const onFinally = () => {
    setLoading(false)
  }


  // [4] REST API 요청
  const loadWordHome = () => {
    setLoading(true)
    api.get("/words/search",
      { onSuccess, onError, onFinally }
    )
  }

  useEffect(() => {
    loadWordHome()
  }, [])

  // [5] 반환
  return {
    homeData,
    Loading,
    reload: loadWordHome,
    clearHomeData,
  }
}