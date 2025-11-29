import { useState } from "react"
import { api } from "../utils/fetchUtils"
import { useAuthStore } from "../stores/useAuthStore"

/**
 * 인증 상태 검증 hook
 */

export function useAuth() {

  // 전역 저장소
  const { login, logout, setLoading, loginMember } = useAuthStore()

  // [1] 로그인 성공/실패 콜백 함수
  const onSuccess = rp => { 

    // data가 있으면 로그인 처리, 없으면 로그아웃
    if (rp.data) login(rp.data)
    else logout()
  }
  
  const onError = rp => { 
    logout() // 요청 실패 시 로그아웃
  }

  const onFinally = () => {
    setLoading(false)
  }

  // [2] 로그인 성공/실패 콜백 함수 정의
  const authenticate = () => {
    api.get('/auth/me', { onSuccess, onError, onFinally, handleError: false })
  }

  // [3] 반환
  return { authenticate }
}