import { useEffect, useState } from "react"
import { api } from "../../../base/utils/fetchUtils"
import { useSnackbar } from "../../../base/provider/SnackbarProvider"

export function useMemberWordbook(termId) {

  // [1] 상태
  const [added, setAdded] = useState(false)
  const { showSnackbar } = useSnackbar()

  // [2] 단어장 포함 여부 조회
  const fetchStatus = () => {
    api.get(`/members/wordbook/${termId}`, {
      onSuccess: rp => setAdded(rp.data)
    })
  }

  // [3] 추가
  const add = () => {
    api.post('/members/wordbook', {
      onSuccess: () => {
        setAdded(true)
        showSnackbar('단어장에 추가했습니다', 'success')
      }
    }, { termId })
  }

  // [4] 삭제
  const remove = () => {
    api.delete(`/members/wordbook/${termId}`, {
      onSuccess: () => {
        setAdded(false)
        showSnackbar('단어장에서 제거했습니다', 'success')
      }
    }, { termId })
  }

  // [5] 초기 로딩
  useEffect(() => {
    if (termId) fetchStatus()
  }, [termId])

  return {
    added,
    add,
    remove,
  }
}
