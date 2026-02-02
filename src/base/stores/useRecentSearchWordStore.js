// stores/useRecentSearchStore.js
import { create } from 'zustand'

/**
 * 최근 검색어를 전역적으로 관리하기 위한 store
 * @since 2025-01-24
 * @author kcw
 */

export const useRecentSearchWordStore = create(set => ({

  // 최근 검색어 목록
  recentKeywords: [],

  // 페이지 로드 처리 (최근 검색어 일괄 조회 후 저장)
  load: (loadedKeywords) => set({ recentKeywords: loadedKeywords }),

  // 검색어 추가
  add: (keyword) => set((state) => ({
    recentKeywords: [keyword, ...state.recentKeywords.filter(k => k !== keyword)].slice(0, 10)
  })),

  // 검색어 제거
  remove: (keyword) => set((state) => ({
    recentKeywords: state.recentKeywords.filter(k => k !== keyword)
  })),

  // 검색어 일괄 제거 (로그아웃 등)
  clear: () => set({ recentKeywords: [] }),

}))