import { useEffect, useState } from 'react'
import { api } from '../../../base/utils/fetchUtils'
import { useAuthStore } from '../../../base/stores/useAuthStore'
import { useSnackbar } from '../../../base/provider/SnackbarProvider'
import { useMeDetail } from '../../mypage/hooks/useMeDetail'

// 초기 상태
/**
 * 회원 닉네임 변경 훅
 */
export function useMemberNickname() {

  // [1] 상태

  const [loading, setLoading] = useState(false)

  const { me } = useMeDetail()
  const { showSnackbar } = useSnackbar()
  const [nicknameRq, setNicknameRq] = useState({ nickname: '' })

  // [2] 상태 변경
  const changeNicknameRq = (rq) =>
    setNicknameRq(prev => ({ ...prev, ...rq }))


  // [3] API 요청// 닉네임 변경 요청
  const submitNickname = async () => {
    if (!nicknameRq.nickname.trim()) {
      showSnackbar('닉네임을 입력해주세요.', 'warning')
      return false
    }

    setLoading(true)

    let success = false

    await api.patch(
      '/members/me/nickname',
      {
        onSuccess: () => {
          showSnackbar('닉네임이 변경되었습니다.', 'success')
          success = true
        },
        onError: (rp) => {
          showSnackbar(
            rp?.message || '닉네임 변경에 실패했습니다.',
            'error'
          )
        },
        onFinally: () => {
          setLoading(false)
        }
      },
      nicknameRq
    )

    return success
  }

  // [5] 반환
  return {
    nicknameRq,
    loading,
    changeNicknameRq,
    submitNickname,
  }
}
