import { useState } from 'react'
import { api } from '../../../base/utils/fetchUtils'
import { useSnackbar } from '../../../base/provider/SnackbarProvider'

// 초기 상태
const INITIAL_PASSWORD_RQ = {
  currentPassword: '',
  password: '',
  passwordConfirm: '',
}

/**
 * 회원 비밀번호 변경 훅
 */
export function useMemberPassword() {

  // [1] 상태
  const [passwordRq, setPasswordRq] = useState(INITIAL_PASSWORD_RQ)
  const [loading, setLoading] = useState(false)

  const { showSnackbar } = useSnackbar()

  // [2] 상태 변경
  const changePasswordRq = (rq) =>
    setPasswordRq(prev => ({ ...prev, ...rq }))

  // [3] 검증
  const validate = () => {
    const { currentPassword, password, passwordConfirm } = passwordRq


    // 1) 필수 입력
    if (!currentPassword?.trim()) {
      showSnackbar('현재 비밀번호를 입력해주세요.', 'warning')
      return false
    }
    if (!password?.trim()) {
      showSnackbar('새 비밀번호를 입력해주세요.', 'warning')
      return false
    }
    if (!passwordConfirm?.trim()) {
      showSnackbar('비밀번호 확인을 입력해주세요.', 'warning')
      return false
    }

    // 2) 정책
    if (password.length < 8) {
      showSnackbar('비밀번호는 8자 이상이어야 합니다.', 'warning')
      return false
    }
    if (currentPassword === password) {
      showSnackbar('새 비밀번호는 현재 비밀번호와 달라야 합니다.', 'warning')
      return false
    }

    // 3) 일치 여부
    if (password !== passwordConfirm) {
      showSnackbar('비밀번호가 일치하지 않습니다.', 'error')
      return false
    }

    return true
  }


  // [3] API 요청
  const submitPassword = async () => {
    if (!validate()) return false

    const payload = {
      currentPassword: passwordRq.currentPassword,
      newPassword: passwordRq.password,
    }

    setLoading(true)
    let success = false

    await api.patch(
      '/members/me/password',
      {
        onSuccess: () => {
          showSnackbar('비밀번호가 변경되었습니다.', 'success')
          setPasswordRq(INITIAL_PASSWORD_RQ)
          success = true
        },
        onError: (rp) => {
          showSnackbar(
            '비밀번호 변경에 실패했습니다. 다시 한번 맞는지 확인해주세요.', 'error')
        },
        onFinally: () => {
          setLoading(false)
        }
      },
      payload
    )

    return success
  }

  // [6] 반환
  return {
    passwordRq,
    loading,
    changePasswordRq,
    submitPassword,
  }
}
