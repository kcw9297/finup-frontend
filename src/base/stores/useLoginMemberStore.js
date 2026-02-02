import { create } from 'zustand'

export const useLoginMemberStore = create(set => ({

  isAuthenticated: false, // 전역 상태 : 로그인
  loginMember: null,      // 전역 상태 : 로그인 회원 정보(인증 주체 정보만 저장 (memberId, email, role))
  loading: true,          // 인증 로딩 상태

  // 전역 로딩 상태 설정
  setLoading: (loading) => set({ loading }),

  // 로그인 - 인증 상태 및 로그인 회원 
  login: data => set({
    isAuthenticated: true,
    loginMember: data,
    loading: false // 로그인 성공 시 로딩 헤제
  }),

  // 로그아웃 - 인증 상태 초기화
  logout: () => set({
    isAuthenticated: false,
    loginMember: null,
  }),

  // 회원 특정 정보 갱신
  editLoginMember: (updates) => set((state) => ({
    loginMember: state.loginMember 
      ? { ...state.loginMember, ...updates }  // 기존 데이터 유지하며 업데이트
      : null
  })),

}))
