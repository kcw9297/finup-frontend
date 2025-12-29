import { useState } from "react";
import { api } from "../../../base/utils/fetchUtils";

/**
 * 단어 암기 상태 관리 훅
 * @author khj
 * @since 2025-12-30
 */


export function useWordMemorize(termId) {
  // [1] 상태
  const [memorizeStatus, setMemorizeStatus] = useState(null)
  const [memorizedAt, setMemorizedAt] = useState(null)
  const [loading, setLoading] = useState(false)

  // [2] 초기 상태 조회
  const init = (detail) => {
    if (!detail) return
    setMemorizeStatus(detail.memorizeStatus)
    setMemorizedAt(detail.memorizedAt)
  }

  // [3] 암기 토글
  const toggleMemorize = () => {
    if (!termId) return

    setLoading(true)

    api.patch(
      `/members/wordbook/${termId}/memorize`, {
      onSuccess: (rp) => {
        setMemorizeStatus(rp.data.memorizeStatus)
        setMemorizedAt(rp.data.memorizedAt)
      },
      onFinally: () => {
        setLoading(false)
      }
    },
      {
        memorizeStatus:
          memorizeStatus === 'MEMORIZED'
            ? 'NONE'
            : 'MEMORIZED'
      }
    )
  }
  // [4] 반환
  return {
    memorizeStatus,
    memorizedAt,
    loading,
    init,
    toggleMemorize,
  }
}