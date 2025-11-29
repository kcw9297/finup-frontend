import { create } from 'zustand'

export const useAuthStore = create(set => ({

  isAuthenticated: false, // 전역 상태 : 로그인
  loading: true,          // 전역 상태 : 로그인 중 (초기값 true)
  loginMember: null,      // 전역 상태 : 로그인 회원 정보


  // 로딩 중 - 로그인 시도 중
  setLoading: status => set({ loading: status }),

  // 로그인 - 인증 상태 및 로그인 회원 
  login: data => set({
    isAuthenticated: true,
    loading: false, // 로딩 완료
    loginMember: data,
  }),

  // 로그아웃 - 인증 상태 초기화
  logout: () => set({
    isAuthenticated: false,
    loading: false, // 로딩 완료
    loginMember: null,
  }),

}))
