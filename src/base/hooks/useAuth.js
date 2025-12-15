import { useState } from "react"
import { api } from "../utils/fetchUtils"
import { useAuthStore } from "../stores/useAuthStore"
import { useSnackbar } from "../provider/SnackbarProvider"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * 인증 상태 검증 hook
 * @since 2025-11-26
 * @author kcw
 */

export function useAuth() {

  // 전역 저장소
  const { login, logout, isAuthenticated, loginMember, loading, setLoading  } = useAuthStore()
  const { showSnackbar } = useSnackbar()
  const location = useLocation() // 현재 경로
  const navigate = useNavigate()

  // 제공 함수 선언
  // 로그인 상태 인증
  const authenticate = async () => {

    // 성공/실패/최종 콜백 함수 선언
    const onSuccess = rp => { 
      // data가 있으면 로그인 처리, 없으면 로그아웃
      if (rp.data) login(rp.data)
      else logout()
    }
    const onError = () => logout() // 요청 실패 시 로그아웃
    const onFinally = () => setLoading(false)

    // 인증 수행
    setLoading(true) // 로딩 설정
    await api.get('/auth/me', { onSuccess, onError, onFinally, handleError: false })
  }

  // 로그인 처리 (로그인 성공 시, 전역상태 변경)
  const handleLogin = (loginMember) => {
    login(loginMember)
  }

  // 관리자 판별 함수
  const isAdmin = () => {
    return loginMember.role === 'ADMIN'
  }


  // 로그아웃 처리 (사용자가 직접 로그아웃 버튼을 누른 경우)
  const handleLogout = async () => {

    const onSuccess = rp => {
      showSnackbar(rp.message, 'success') // 로그아웃 안내 출력
      logout() // 로그아웃 처리
      if (!location.pathname === '/') navigate('/', { replace: true }) // 홈으로 이동
    }

    const onFinally = () => {
      setLoading(false)
    }

    await api.post('/logout', { onSuccess, onFinally })
  }

  // [3] 반환
  return { 
    loading, isAuthenticated, loginMember,
    authenticate, handleLogout, handleLogin, isAdmin
  }
}